'use client';
import { useEffect, useState } from 'react';
import MessageBox from '../messagebox/messagebox';
import styles from './messagesgrid.module.scss';

interface Conversation {
  _id: string;
  users: string[];
}

interface FilteredConversation {
  convoid: string;
  otherUserId: string;
}

//first fetch all conversation documents of a user with their id

const MessagesGrid = () => {
  const [conversations, setConversations] = useState<FilteredConversation[]>(
    [],
  ); //stores all the conversations
  const [loading, setLoading] = useState<boolean>(false);
  const currentUserId = '123';

  useEffect(() => {
    const getConversations = async (): Promise<void> => {
      try {
        setLoading(true);
        const url: string = `http://localhost:3000/conversations/${currentUserId}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWVkNzA2N2M3ZjUzZDNiZjc4YjBjMTUiLCJpYXQiOjE3NzgyMTIzODIsImV4cCI6MTc3ODIxNDE4Mn0.hV05Ucp54d9FMvV-8OGZ_Yu0-eSKLOxtkUV1izXPh5Y',
          },
        });

        const result = await response.json();

        const filtered = result.data.map((convo: Conversation) => ({
          convoid: convo._id,
          otherUserId: convo.users.find(
            (userId: string) => userId !== currentUserId,
          ),
        }));

        setConversations(filtered);
        setLoading(false);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  console.log(conversations);

  if (loading) {
    return (
      <div className={styles['message-list']}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div className={styles['message-box-skeleton']} key={index}>
            <div className={styles['skeleton-avatar']} />

            <div className={styles['skeleton-content']}>
              <div className={styles['skeleton-name']} />
              <div className={styles['skeleton-message']} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles['message-list']}>
      {conversations.map((convo) => (
        <MessageBox
          key={convo.convoid}
          otherUserId="69913c48319b26c59692cf27"
          conversationId={convo.convoid}
        />
      ))}
    </div>
  );
};

export default MessagesGrid;
