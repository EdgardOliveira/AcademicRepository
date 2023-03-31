import { useCallback, useEffect, useState } from "react";
import { getAllData } from "../libs/rest/RESTClient";

function useGetInFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllData(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error };
}

export default useGetInFetch;
