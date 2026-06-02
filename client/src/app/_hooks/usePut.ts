import { useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function usePut<T>(resource: string) {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function modifyResource(object: T, params?: string) {
    setPending(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}${resource}${params ? '/' + params : ''}`,
        {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(object),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to put to ${resource}: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setPending(false);
    }
  }

  return { modifyResource, pending, error };
}
