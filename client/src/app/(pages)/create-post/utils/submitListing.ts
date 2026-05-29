import { loadEnvFile } from 'process';

loadEnvFile('.env');

export type ListingFormData = {
  title: string;
  desc: string;
  price: string;
  category: string;
  stock?: number;
};

export async function submitListing(data: ListingFormData) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      desc: data.desc,
      price: Number(data.price),
      category: data.category,
      stock: data.stock ?? 1,
    }),
  });
}
