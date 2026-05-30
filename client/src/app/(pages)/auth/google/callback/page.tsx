import { redirect } from 'next/navigation';

export default function Callback() {
  throw redirect('/');
}
