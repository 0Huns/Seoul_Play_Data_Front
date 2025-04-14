import { ageGroupOptions, districtOptions, industryOptions } from '@/data/selectData';
import SelectList from './SelectList';

export default function SearchBar() {
  return (
    <form
      autoComplete="off"
      className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectList name="선호 업종" data={industryOptions} />
        <SelectList name="지역구" data={districtOptions} />
        <SelectList name="행정동" data={districtOptions} />
        <SelectList name="타겟 연령대" data={ageGroupOptions} />
      </div>
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
