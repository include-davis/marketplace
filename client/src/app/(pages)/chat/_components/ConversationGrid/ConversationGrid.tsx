'use client';
import styles from './ConversationGrid.module.scss';
import useFetch from '@/app/_hooks/useFetch';
import { Conversation } from '@/../../../server/models/Conversation';
import MessageBox from '../MessageBox/MessageBox';
import { Message } from '../../../../../../../server/models/Message';

export default function ConversationGrid({
  messages,
}: {
  messages: Message[];
}) {
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

  const lastMessage = messages && messages.length !== 0 ? messages[messages.length - 1].message : "";

  if (fetchConversationsLoading) return <div>Loading conversations...</div>;
  if (fetchConversationsError || !conversations)
    return <div>Error fetching conversations.</div>;

  return (
    <div className={styles['message-list']}>
      {conversations.map((convo) => (
        <MessageBox
          key={convo._id.toString()}
          otherUserId="69cb1158039ab28790c904d9"
          conversationId={convo._id.toString()}
          lastSent={lastMessage}
        />
      ))}
    </div>
  );
}
