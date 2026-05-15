'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './MessageInput.module.scss';

export default function MessageInput({
  onSend,
}: {
  onSend: (data: { text: string; createdAt: string }) => void;
}) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend({ text: text.trim(), createdAt: new Date().toISOString() });
    setText('');
  };

  return (
    <div className={styles.inputBar}>
      <div className={styles.inputIcons}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Attach link"
        >
          <Image
            src="/messaging/link.svg"
            alt="Link icon"
            width={24}
            height={24}
          />
        </button>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Attach image"
        >
          <Image
            src="/messaging/camera.svg"
            alt="Camera icon"
            width={24}
            height={24}
          />
        </button>
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Message..."
        className={styles.textInput}
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={!text.trim()}
        className={styles.sendButton}
        aria-label="Send message"
      >
        <Image
          src="/messaging/send.svg"
          alt="Send icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
