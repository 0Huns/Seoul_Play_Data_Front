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
// import { useRouter } from 'next/router';

export default function SearchBar() {
  // const router = useRouter();

  const [detail, setDetail] = useState(false);
  const [valueFromChild, setValueFromChild] = useState('');

  const handleValueChange = (newValue: string) => {
    setValueFromChild(newValue);
  };

  const filteredSubDistricts = useMemo(() => {
    return subDistrictOptions[valueFromChild] || [];
  }, [valueFromChild]);

  useEffect(() => {
    setDetail(false);
  }, [valueFromChild]);

  return (
    <form
      action={'/search'}
      method="POST"
      autoComplete="off"
      className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <span className="block text-sm font-bold text-gray-700 mb-1">필수 선택</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectList
          id="지역구"
          name="gu"
          data={districtOptions}
          required={true}
          onValueChange={handleValueChange}
        />
        <SelectList id="선호업종" name="category" data={industryOptions} required={true} />
        <SelectList id="상권구분" name="area_type" data={commercialOptions} required={true} />
      </div>
      <div
        className="block w-1/3 text-sm font-bold text-gray-700 mb-1 cursor-pointer"
        onClick={() => setDetail(!detail)}
      >
        {detail ? <span>▲ </span> : <span>▼ </span>}
        상세조건
      </div>
      {detail && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectList id="행정동" name="dong" data={filteredSubDistricts} required={false} />
          <SelectList id="타겟 연령대" name="age" data={ageGroupOptions} required={false} />
          <SelectList id="타겟 성별" name="gender" data={genderOptions} required={false} />
        </div>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          검색
        </button>
      </div>
    </form>
  );
}
