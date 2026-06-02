import { useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function usePostImage<T>() {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function postImage(file: File, folder: string) {
    setPending(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      const response = await fetch(`${BACKEND_URL}/images/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to post new file upload: ${response.status}`);
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

  return { postImage, pending, error };
}
