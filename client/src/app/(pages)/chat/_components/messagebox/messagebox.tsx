'use client';
import { useEffect, useState } from 'react';
import styles from './messagesbox.module.scss';

interface MessageBoxProps {
  otherUserId: string;
  conversationId: string;
}

const MessageBox = ({ otherUserId, conversationId }: MessageBoxProps) => {
  const [userName, setUsername] = useState<String>('');

  useEffect(() => {
    const getOtherUserName = async (): Promise<void> => {
      try {
        const url: string = `http://localhost:3000/users/${otherUserId}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer {auth token here}',
          },
        });

        const result = await response.json();

        setUsername(result);
      } catch (err) {
      } finally {
      }
    };

    getOtherUserName();
  }, []);

  const placeholderuserName = 'placeholder';

  return (
    <div className={styles['message-box']} data-id={conversationId}>
      <img
        src={'https://i.pravatar.cc/100'} //placeholder
        alt="avatar"
        className={styles.avatar}
      />

      <div className={styles.content}>
        <div className={styles['top-row']}>
          <span className={styles.username}>{placeholderuserName}</span>
          <span className={styles.time}>{}</span>
        </div>

        <div className={styles.message}>
          {'placeholder (last sent message)'}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
