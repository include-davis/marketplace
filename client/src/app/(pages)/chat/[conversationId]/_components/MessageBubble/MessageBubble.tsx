'use client';

import Image from 'next/image';
import styles from './MessageBubble.module.scss';
import type { Message } from "@/../../server/models/Message"

export default function MessageBubble({
  message,
  isOwn,
  avatarUrl,
}: {
  message: Message;
  isOwn: boolean;
  avatarUrl?: string | null;
}) {
  return (
    <div className={`${styles.bubbleRow} ${isOwn ? styles.own : styles.other}`}>
      {!isOwn && (
        <div className={styles.avatar}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt={
                message.senderId
                  ? `Avatar for user ${message.senderId}`
                  : 'User avatar'
              }
              width={40}
              height={40}
            />
          )}
        </div>
      )}

      <div className={styles.bubbleContent}>
        {message.image && (
          <Image
            src={message.image}
            alt={'Message attachment'}
            width={200}
            height={200}
            className={styles.messageImage}
          />
        )}
        <div
          className={`${styles.bubble} ${isOwn ? styles.own : styles.other}`}
        >
          {message.message}
        </div>

        {isOwn && <span className={styles.deliveredText}>Delivered</span>}
      </div>
    </div>
  );
}
