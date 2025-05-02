'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface ListData {
  value: string;
  label: string;
}

interface Props {
  id: string;
  name: string;
  data: ListData[];
  required: boolean;
  onValueChange?: (value: string) => void;
}

export default function SelectList({ id, name, data, required, onValueChange }: Props) {
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
      <label
        htmlFor={id}
        className="block px-9 py-6 text-sm font-medium text-gray-700 cursor-pointer"
      >
        {id}

        <div className="flex items-center justify-between mt-1">
          <input
            id={id}
            name={name}
            type="text"
            value={typing}
            required={required}
            placeholder={`${id} 선택`}
            className="w-full py-2 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-sm cursor-pointer"
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setIsOpen(true);
              setTyping(e.target.value);
            }}
          />
          {typing && (
            <span className="hover:cursor-pointer p-2" onClick={() => setTyping('')}>
              x
            </span>
          )}{' '}
        </div>
      </label>

      {isOpen && (
        <ul className="z-50 absolute left-0 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-md">
          {filterList.length > 0 ? (
            filterList.map((e) => (
              <li
                key={e.value}
                tabIndex={0}
                role={e.label}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setTyping(e.label);
                    setIsOpen(false);
                    if (onValueChange) {
                      onValueChange(e.label);
                    }
                  }
                }}
                onClick={() => {
                  setTyping(e.label);
                  setIsOpen(false);
                  if (onValueChange) {
                    onValueChange(e.label);
                  }
                }}
                className="px-4 py-2 text-sm cursor-pointer focus:font-bold focus:outline-none focus:bg-blue-50 hover:bg-blue-50 transition-colors"
              >
                {e.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-400">검색 결과 없음</li>
          )}
        </ul>
      )}
    </div>
  );
}
