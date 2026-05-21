export type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
  image?: string | null;
};

export type ServerMessage = {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverIds: string[];
  message: string;
  image?: string | null;
  createdAt: string;
};
