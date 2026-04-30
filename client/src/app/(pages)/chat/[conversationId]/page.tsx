"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import ChatWindow from "./ChatWindow";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface ServerMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverIds: string[];
  message: string;
  image?: string | null;
  createdAt: string;
}

interface UIMessage {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
  image?: string | null;
}

function toUIMessage(msg: ServerMessage): UIMessage {
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

  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // TODO: Replace with real auth context when available
  const currentUserId = typeof window !== "undefined"
    ? localStorage.getItem("userId") || ""
    : "";
  const receiverIds = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("receiverIds") || "[]")
    : [];
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token") || ""
    : "";

  // Placeholder values — will be populated from conversation/listing data
  const productName = typeof window !== "undefined"
    ? localStorage.getItem("chatProductName") || "Product Name"
    : "Product Name";
  const productImage = typeof window !== "undefined"
    ? localStorage.getItem("chatProductImage") || null
    : null;
  const otherUserAvatar = typeof window !== "undefined"
    ? localStorage.getItem("chatOtherUserAvatar") || null
    : null;

  useEffect(() => {
    if (!conversationId) return;

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
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    // Connect Socket.IO
    const socket = io(API_URL, {
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join_room", conversationId);
    });

    socket.on("receive_message", (msg: ServerMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg._id)) return prev;
        return [...prev, toUIMessage(msg)];
      });
    });

    socket.on("error", (err: { message: string }) => {
      console.error("Socket error:", err.message);
    });

    socket.on("disconnect", () => {
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

      socketRef.current.emit("send_message", {
        conversationId,
        senderId: currentUserId,
        receiverIds,
        message: data.text,
        image: null,
      });
    },
    [conversationId, currentUserId, receiverIds]
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <ChatWindow
      messages={messages}
      currentUserId={currentUserId}
      onSend={handleSend}
      productName={productName}
      productImage={productImage}
      otherUserAvatar={otherUserAvatar}
      onBack={handleBack}
    />
  );
}
