import { useCallback, useEffect, useState } from "react";
import { postData } from "../libs/rest/RESTClient";

function usePostInFetch<T = unknown>(url: string, body: object) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const post = useCallback(async () => {
    setLoading(true);
    try {
      const response = await postData(url, body);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [url, body]);

  useEffect(() => {
    post();
  }, [post]);

  return { data, loading, error };
}

export default usePostInFetch;
