'use client';
import Image from 'next/image';
import { User } from '../../../../../../../server/models/User';
import styles from './messagesbox.module.scss';
import useFetch from '@/app/_hooks/useFetch';

interface MessageBoxProps {
  otherUserId: string;
  conversationId: string;
}

const MessageBox = ({ otherUserId, conversationId }: MessageBoxProps) => {
  const {
    result: user,
    loading,
    error,
  } = useFetch<User>(`/users/${otherUserId}`);

  if (loading || error || !user) return;

  const username = user.email;

  return (
    <div className={styles.messageBox} data-id={conversationId}>
      <div className={styles.userIconWrapper}>
        <Image
          src="/Navbar/userIcon.svg"
          alt="avatar"
          className={styles.avatar}
          width={54}
          height={54}
        />
      </div>

      <div className={styles.content}>
        <span className={styles.username}>{username}</span>

        <p className={styles.message}>{'placeholder (last sent message)'}</p>
      </div>
    </div>
  );
};

export default MessageBox;
