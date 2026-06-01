import { useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function usePost<T>(resource: string) {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function postResource(object: T) {
    setPending(true);
    try {
      const response = await fetch(`${BACKEND_URL}${resource}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(object),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to post to ${resource}: ${response.status}`);
      }
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

  return { postResource, pending, error };
}
