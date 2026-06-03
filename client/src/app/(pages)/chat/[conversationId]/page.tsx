'use client';

import styles from './page.module.scss';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import ChatWindow from './_components/ChatWindow/ChatWindow';
import Navbar from '@/app/_components/Navbar/Navbar';
import ConversationGrid from '../_components/ConversationGrid/ConversationGrid';
import Link from 'next/link';
import Image from 'next/image';
import LeftArrow from '@/../public/leftArrow.svg';
import useFetch from '@/app/_hooks/useFetch';
import { useAuth } from '@/app/_context/AuthContext';
import { Message } from '@/../../server/models/Message';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.conversationId as string;
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const fetchedMessages = useRef<boolean>(false);
  const { user } = useAuth();
  const userId = user?._id;

  const {
    result,
    error,
    loading,
  }: {
    result?: { messages: Message[] };
    error?: string;
    loading: boolean;
  } = useFetch(`/messages/${conversationId}`);

  const [messages, setMessages] = useState<Message[] | []>([]);

  useEffect(() => {
    if (!fetchedMessages.current && result) {
      const newMessages = [...result?.messages, ...messages];
      setMessages(newMessages);
      fetchedMessages.current = true;
    }
    // Connect Socket.IO
    const socket = io(API_URL, {
      transports: ['websocket', 'polling'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join_room', conversationId);
    });

    socket.on('receive_message', (msg: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    socket.on('error', (err: { message: string }) => {
      console.error('Socket error:', err.message);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [conversationId, result]);

  const handleSend = useCallback(
    (data: { text: string; createdAt: string }) => {
      if (!socketRef.current || !userId) return;

      socketRef.current.emit('send_message', {
        conversationId,
        senderId: userId,
        message: data.text,
        image: null,
      });
    },
    [conversationId, userId],
  );

  if (loading) return <div>Loading messages...</div>;
  if (error || messages === undefined || messages === null)
    return <div>Failed to load messages.</div>;

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.chatPageHeader}>
        <Link href="/" className={styles.headerLink}>
          <Image src={LeftArrow} alt="<" />
          <span>Back to Listings</span>
        </Link>
      </div>
      <div className={styles.pageContent}>
        <ConversationGrid />
        <ChatWindow
          messages={messages}
          currentUserId={userId?.toString() || ''}
          onSend={handleSend}
          // productName={'product name'}
          // productImage={productImage}
          // otherUserAvatar={otherUserAvatar}
        />
      </div>
    </div>
  );
}
