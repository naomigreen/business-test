import { useState, useEffect } from 'react';


export const useFetch = (url: string, initialValue: any) => {
  const [data, setData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(
    () => {
      const fetchData = async () => {
        setLoading(true)
        const res = await fetch(url);
        const result = await res.json();
        setData(result);
        setLoading(false)
      };
      try {
        fetchData();
      } catch (e: any) {
        setErrorMsg(e.message);
      }
    },
    [url]
  );
  if (errorMsg) {
    console.log(errorMsg);
  }

  return [data, loading];
};
