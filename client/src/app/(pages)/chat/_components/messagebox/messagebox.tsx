'use client';
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
      <img
        src={'https://i.pravatar.cc/100'} //placeholder
        alt="avatar"
        className={styles.avatar}
      />

      <div className={styles.content}>
        <span className={styles.username}>{username}</span>

        <p className={styles.message}>{'placeholder (last sent message)'}</p>
      </div>
    </div>
  );
};

export default MessageBox;
