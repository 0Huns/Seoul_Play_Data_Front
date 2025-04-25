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

export default function SearchBar() {
  const router = useRouter();

  const [detail, setDetail] = useState(false);
  const [valueFromChild, setValueFromChild] = useState('');

  const handleSubmit = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
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

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="w-full max-w-5xl mx-auto px-8 py-6 bg-white/60 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-400 flex flex-col gap-6"
    >
      {/* 제목 */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-neutral-700 tracking-tight">필수 조건</h2>
      </div>

      {/* 필수 필드 그룹 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {requiredFields.map((field) => (
          <div
            key={field.name}
            className="z-10 bg-white rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-md hover:shadow-lg border border-gray-400 font-medium cursor-pointer"
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
          {detail ? '▲ 상세 조건 숨기기' : '▼ 상세 조건 열기'}
        </button>
      </div>

      {/* 상세 필드 그룹 */}
      {detail && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {optionalFields.map((field) => (
            <div
              key={field.name}
              className="z-9 bg-white rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-md hover:shadow-lg border border-gray-400 font-medium cursor-pointer"
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
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:brightness-110"
        >
          검색
        </button>
      </div>
    </form>
  );
}
