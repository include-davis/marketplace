"use client";

import styles from "./chat.module.scss";

interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
  image?: string | null;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  avatarUrl?: string | null;
}

export default function MessageBubble({ message, isOwn, avatarUrl }: MessageBubbleProps) {
  return (
    <div className={`${styles.bubbleRow} ${isOwn ? styles.own : styles.other}`}>
      {!isOwn && (
        <div className={styles.avatar}>
          {avatarUrl && <img src={avatarUrl} alt="" />}
        </div>
      )}

      <div className={styles.bubbleContent}>
        {message.image && (
          <img
            src={message.image}
            alt=""
            style={{ maxWidth: 200, borderRadius: 12, marginBottom: 4 }}
          />
        )}
        <div className={`${styles.bubble} ${isOwn ? styles.own : styles.other}`}>
          {message.text}
        </div>

        {isOwn && <span className={styles.deliveredText}>Delivered</span>}
      </div>
    </div>
  );
}
