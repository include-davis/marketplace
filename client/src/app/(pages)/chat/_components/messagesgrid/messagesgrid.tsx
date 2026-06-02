'use client';
import { useEffect, useState } from 'react';
import MessageBox from '../messagebox/messagebox';
import styles from './messagesgrid.module.scss';
import useFetch from '@/app/_hooks/useFetch';

interface Conversation {
  _id: string;
  users: string[];
}

interface FilteredConversation {
  convoid: string;
  otherUserId: string;
}

const MessagesGrid = () => {
  const currentUserId = '6a136cd69cfa424e14e2d67c';
  const {
    result: conversations,
    error: fetchConversationsError,
    loading: fetchConversationsLoading,
  } = useFetch(`/conversations/user/${currentUserId}`);

  if (fetchConversationsLoading) return <div>Loading conversations...</div>;
  if (fetchConversationsError) return <div>Error fetching conversations.</div>;

  console.log('conversations', conversations);

  return (
    <div className={styles['message-list']}>
      {conversations.map((convo) => (
        <MessageBox
          key={convo._id}
          otherUserId="69cb1158039ab28790c904d9"
          conversationId={convo.convoid}
        />
      ))}
    </div>
  );
};

export default MessagesGrid;
