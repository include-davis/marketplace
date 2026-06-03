'use client';
import Image from 'next/image';
import { User } from '../../../../../../../server/models/User';
import styles from './MessageBox.module.scss';
import useFetch from '@/app/_hooks/useFetch';
import Link from 'next/link';

export default function MessageBox({
  otherUserId,
  conversationId,
  lastSent,
}: {
  otherUserId: string;
  conversationId: string;
  lastSent?: string;
}) {
  const {
    result: user,
    loading,
    error,
  } = useFetch<User>(`/users/${otherUserId}`);

  if (loading || error || !user) return;

  const username = user.email;

  return (
    <Link
      className={styles.messageBox}
      data-id={conversationId}
      href={`/chat/${conversationId}`}
    >
      <div className={styles.userIconWrapper}>
        <Image
          // src="/Navbar/userIcon.svg"
          src="/mock/naomi_linkedin.jpeg"
          alt="avatar"
          className={styles.avatar}
          width={54}
          height={54}
        />
      </div>

      <div className={styles.content}>
        <span className={styles.username}>{username}</span>

        <p className={styles.message}>{lastSent}</p>
      </div>
    </Link>
  );
}
