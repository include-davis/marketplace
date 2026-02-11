import { MongoClient, ObjectId } from "mongodb";

export interface Message {
  _id?: ObjectId;
  conversationId: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  message: string;
  image: string | null;
  createdAt: Date;
}

export interface CreateMessageData {
  conversationId: string;
  senderId: string;
  receiverId: string;
  message: string;
  image?: string | null;
}

export class MessagesService {
  private client: MongoClient;
  private dbName: string = "marketplace";
  private collectionName: string = "messages";

  constructor(client: MongoClient) {
    this.client = client;
  }

  /**
   * Fetch all messages for a given conversation, sorted by createdAt ascending
   */
  async getMessagesByConversationId(conversationId: string): Promise<Message[]> {
    try {
      const db = this.client.db(this.dbName);
      const collection = db.collection<Message>(this.collectionName);

      const messages = await collection
        .find({ conversationId: new ObjectId(conversationId) })
        .sort({ createdAt: 1 }) // 1 = ascending (oldest → newest)
        .toArray();

      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

  /**
   * Create and store a new message document in MongoDB
   */
  async createMessage(messageData: CreateMessageData): Promise<Message> {
    try {
      const db = this.client.db(this.dbName);
      const collection = db.collection<Message>(this.collectionName);

      const newMessage: Message = {
        conversationId: new ObjectId(messageData.conversationId),
        senderId: new ObjectId(messageData.senderId),
        receiverId: new ObjectId(messageData.receiverId),
        message: messageData.message,
        image: messageData.image || null,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newMessage);
      
      return {
        ...newMessage,
        _id: result.insertedId,
      };
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }
}
