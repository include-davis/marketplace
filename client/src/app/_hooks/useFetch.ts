import { useEffect, useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function useFetch(resource: string) {
  const [result, setResult] = useState();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}${resource}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${resource}: ${response.status}`);
        }

        const json = await response.json();
        setResult(json.data ?? json);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return { result, error, loading };
}
