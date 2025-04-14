'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface ListData {
  value: string;
  label: string;
}

interface Props {
  name: string;
  data: ListData[];
  required: boolean;
  onValueChange?: (value: string) => void;
}

export default function SelectList({ name, data, required, onValueChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [typing, setTyping] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);

      const isValid = data.some((item) => item.label === typing);
      if (!isValid) {
        setTyping('');
      }
      if (onValueChange) {
        onValueChange(typing);
      }
    }
  };

  const filterList = useMemo(() => {
    return data.filter((data) => data.label.toLowerCase().includes(typing.toLowerCase()));
  }, [data, typing]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={menuRef} className="relative w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {name}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={typing}
        required={required}
        placeholder={`${name} 선택`}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setIsOpen(true);
          setTyping(e.target.value);
        }}
      />
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {filterList.length > 0 ? (
            filterList.map((e) => (
              <li
                key={e.value}
                onClick={() => {
                  setTyping(e.label);
                  setIsOpen(false);
                  if (onValueChange) {
                    onValueChange(e.label);
                  }
                }}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
              >
                {e.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">결과 없음</li>
          )}
        </ul>
      )}
    </div>
  );
}
