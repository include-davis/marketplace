"use client";

import { useRef, useEffect } from "react";
import styles from "./chat.module.scss";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
  image?: string | null;
}

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  onSend: (data: { text: string; createdAt: string }) => void;
  productName?: string;
  productImage?: string | null;
  otherUserAvatar?: string | null;
  onBack?: () => void;
}

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 48" fill="currentColor">
      <path d="M18 4L6 24l12 20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ChatWindow({
  messages,
  currentUserId,
  onSend,
  productName = "Product Name",
  productImage,
  otherUserAvatar,
  onBack,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatPage}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          <BackArrowIcon />
          <span>Back</span>
        </button>
        <span className={styles.productName}>{productName}</span>
      </div>

      {/* Product Image */}
      {productImage && (
        <div className={styles.productImageWrapper}>
          <img
            src={productImage}
            alt={productName}
            className={styles.productImage}
          />
        </div>
      )}

      {/* Messages Area */}
      <div className={styles.messagesArea}>
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUserId}
            avatarUrl={msg.senderId !== currentUserId ? otherUserAvatar : null}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} />
    </div>
  );
}
