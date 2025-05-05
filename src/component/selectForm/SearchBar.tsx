'use client';

import {
  ageGroupOptions,
  commercialOptions,
  districtOptions,
  genderOptions,
  industryOptions,
  subDistrictOptions,
} from '@/data/selectData';
import SelectList from './SelectList';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MdOutlineSettings } from 'react-icons/md';
import FormSkeleton from './FormSkeleton';
import Cookies from 'js-cookie';
import Login from '../auth/Login';

export default function SearchBar() {
  const router = useRouter();
  const [detail, setDetail] = useState(false);
  const [valueFromChild, setValueFromChild] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  useEffect(() => {
    const authCookie = Cookies.get('auth');

    if (authCookie) {
      try {
        const authData = JSON.parse(authCookie);
        setIsLoggedIn(authData.isLoggedIn === true);
      } catch (error) {
        console.error('쿠키 파싱 오류:', error);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const queryParams = new URLSearchParams({
      gu: formData.get('gu') as string,
      category: formData.get('category') as string,
      area_type: formData.get('area_type') as string,
      dong: formData.get('dong') as string,
      age: formData.get('age') as string,
      gender: formData.get('gender') as string,
    }).toString();

    router.push(`/search?${queryParams}`);
  };

  const handleValueChange = (newValue: string) => {
    setValueFromChild(newValue);
  };

  const filteredSubDistricts = useMemo(() => {
    return subDistrictOptions[valueFromChild] || [];
  }, [valueFromChild]);

  useEffect(() => {
    setDetail(false);
  }, [valueFromChild]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const requiredFields = [
    { id: '지역구', name: 'gu', data: districtOptions, required: true },
    { id: '선호업종', name: 'category', data: industryOptions, required: true },
    { id: '상권구분', name: 'area_type', data: commercialOptions, required: true },
  ];

  const optionalFields = [
    { id: '행정동', name: 'dong', data: filteredSubDistricts, required: false },
    { id: '타겟 연령대', name: 'age', data: ageGroupOptions, required: false },
    { id: '타겟 성별', name: 'gender', data: genderOptions, required: false },
  ];

  if (loading) {
    return <FormSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="w-full max-w-5xl mx-auto px-8 py-6 bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-300 flex flex-col gap-6"
    >
      {/* 제목 */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold text-neutral-700 tracking-tight">
          <MdOutlineSettings className="text-lg text-red-400" />
          필수 조건
        </h2>
      </div>

      {/* 필수 필드 그룹 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {requiredFields.map((field) => (
          <div
            key={field.name}
            className="bg-white rounded-xl hover:bg-gray-100 active:shadow-inner transition-all shadow-md hover:shadow-lg border border-gray-400 font-medium cursor-pointer"
          >
            <SelectList
              id={field.id}
              name={field.name}
              data={field.data}
              required={field.required}
              onValueChange={field.name === 'gu' ? handleValueChange : undefined}
            />
          </div>
        ))}
      </div>

      {/* 상세 조건 toggle */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setDetail(!detail)}
          className="text-sm text-neutral-600 font-medium hover:text-neutral-800 transition-colors flex items-center gap-1"
        >
          {detail ? <FiChevronUp className="text-base" /> : <FiChevronDown className="text-base" />}
          {detail ? '상세 조건 숨기기' : '상세 조건 열기'}
        </button>
      </div>

      {/* 상세 필드 그룹 */}
      {detail && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {optionalFields.map((field) => (
            <div
              key={field.name}
              className="bg-white rounded-xl hover:bg-gray-100 active:shadow-inner transition-all shadow-md hover:shadow-lg border border-gray-400 font-medium cursor-pointer"
            >
              <SelectList
                id={field.id}
                name={field.name}
                data={field.data}
                required={field.required}
              />
            </div>
          ))}
        </div>
      )}

      {/* 검색 버튼 */}
      {isLoggedIn ? (
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-transform duration-200 transform hover:scale-105"
          >
            <FiSearch className="text-xl" />
            <span>검색</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <Login />
        </div>
      )}
    </form>
  );
}
