'use client';
import MessageBox from '../MessageBox/MessageBox';
import styles from './ConversationGrid.module.scss';
import useFetch from '@/app/_hooks/useFetch';
import { Conversation } from '@/../../../server/models/Conversation';

export default function ConversationGrid() {
  const currentUserId = '6a136cd69cfa424e14e2d67c';
  const {
    result: conversations,
    error: fetchConversationsError,
    loading: fetchConversationsLoading,
  }: {
    result?: Conversation[];
    error?: string;
    loading: boolean;
  } = useFetch(`/conversations/user/${currentUserId}`);

  if (fetchConversationsLoading) return <div>Loading conversations...</div>;
  if (fetchConversationsError || !conversations)
    return <div>Error fetching conversations.</div>;

  console.log('conversations', conversations);

  return (
    <div className={styles['message-list']}>
      {conversations.map((convo) => (
        <MessageBox
          key={convo._id.toString()}
          otherUserId="69cb1158039ab28790c904d9"
          conversationId={convo._id.toString()}
        />
      ))}
    </div>
  );
}
