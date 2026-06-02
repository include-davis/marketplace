'use client';

import styles from "./page.module.scss"
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import ChatWindow from './_components/ChatWindow/ChatWindow';
import type { Message, ServerMessage } from '@/types/messaging';
import Navbar from '@/app/_components/Navbar/Navbar';
import ConversationGrid from "../_components/ConversationGrid/ConversationGrid";
import Link from "next/link";
import Image from "next/image";
import LeftArrow from '@/../public/leftArrow.svg';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

function toUIMessage(msg: ServerMessage): Message {
  return {
    id: msg._id,
    text: msg.message,
    senderId: msg.senderId,
    createdAt: msg.createdAt,
    image: msg.image,
  };
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.conversationId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // Store localStorage values in state to avoid hydration mismatch
  const [currentUserId, setCurrentUserId] = useState('');
  const [receiverIds, setReceiverIds] = useState<string[]>([]);
  const [token, setToken] = useState('');
  const [productName, setProductName] = useState('Product Name');
  const [productImage, setProductImage] = useState<string | null>(null);
  const [otherUserAvatar, setOtherUserAvatar] = useState<string | null>(null);

  // Initialize localStorage values after hydration
  useEffect(() => {
    setCurrentUserId(localStorage.getItem('userId') || '');
    setReceiverIds(JSON.parse(localStorage.getItem('receiverIds') || '[]'));
    setToken(localStorage.getItem('token') || '');
    setProductName(localStorage.getItem('chatProductName') || 'Product Name');
    setProductImage(localStorage.getItem('chatProductImage') || null);
    setOtherUserAvatar(localStorage.getItem('chatOtherUserAvatar') || null);
  }, []);

  useEffect(() => {
    if (!conversationId || !token) return;

    // Fetch message history
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/messages/${conversationId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          const serverMessages: ServerMessage[] = data.messages || data;
          setMessages(serverMessages.map(toUIMessage));
        }
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    fetchMessages();

    // Connect Socket.IO
    const socket = io(API_URL, {
      transports: ['websocket', 'polling'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join_room', conversationId);
    });

    socket.on('receive_message', (msg: ServerMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg._id)) return prev;
        return [...prev, toUIMessage(msg)];
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
  }, [conversationId, token]);

  const handleSend = useCallback(
    (data: { text: string; createdAt: string }) => {
      if (!socketRef.current || !currentUserId) return;

      socketRef.current.emit('send_message', {
        conversationId,
        senderId: currentUserId,
        receiverIds,
        message: data.text,
        image: null,
      });
    },
    [conversationId, currentUserId, receiverIds],
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.chatPageHeader}>
        <Link href="/" className={styles.headerLink}>
          <Image src={LeftArrow} alt="<" />
          <span>Back to Listings</span>
        </Link>
      </div>
      <ConversationGrid />
      <ChatWindow
        messages={messages}
        currentUserId={currentUserId}
        onSend={handleSend}
        productName={productName}
        productImage={productImage}
        otherUserAvatar={otherUserAvatar}
        onBack={handleBack}
      />
    </div>
  );
}
