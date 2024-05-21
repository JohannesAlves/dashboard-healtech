import { useEffect, useRef, useState } from 'react';

export const useSearch = <T>(callback: (value: T, term: string) => boolean) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [term, setTerm] = useState('');
  const [data, setData] = useState<T[]>();
  const [filteredData, setFilteredData] = useState<T[]>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current?.value === term && !!term) {
        setFilteredData(data?.filter((dataObj) => callback(dataObj, term)));
      }
    }, 500);

    if (!term) {
      setFilteredData(data);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [term, inputRef]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return { inputRef, filteredData, setData, term, setTerm };
};
