"use client"
import { useEffect, useState } from 'react';
import MessageBox from '../messagebox/messagebox';
import styles from "./messagesgrid.module.scss";


interface Conversaton {
  id: string,
  users: string[],
}

const MessagesGrid = () => {
  const [conversations, setConversations] = useState<Conversaton[]>([]); //stores all the conversations
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {

    const getConversations = async (): Promise<void> => {
      try {

        setLoading(true)
        const url: string = 'http://localhost:3000/conversations/123';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWVkNzA2N2M3ZjUzZDNiZjc4YjBjMTUiLCJpYXQiOjE3Nzc1OTU3OTEsImV4cCI6MTc3NzU5NzU5MX0.Hp4zo3NQyNH2bhpXiTO8SeBLoSmyF0M2MxnZaWbGLc4'
            }
        });
         const result = await response.json();

        const filtered = result.data.map((convo: any) => ({
              id: convo.conversationid,
              users: convo.users,
        }));

        setConversations(filtered);
        setLoading(false)
      } catch (err) {
        
      } finally {
        setLoading(false)
      }
    };

    getConversations();
  }, []);

  if (loading) {
  return (
    <div className={styles["message-list"]}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div className={styles["message-box-skeleton"]} key={index}>
          <div className={styles["skeleton-avatar"]} />

          <div className={styles["skeleton-content"]}>
            <div className={styles["skeleton-name"]} />
            <div className={styles["skeleton-message"]} />
          </div>
        </div>
      ))}
    </div>
  );
}

  return (
    <div className={styles["message-list"]}>
      {conversations.map((convo) => (
        <MessageBox
          key={convo.id}
          username={convo.users[1]}
          conversationId={convo.id}
        />
      ))}
    </div>
  );
};

export default MessagesGrid
