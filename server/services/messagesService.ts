import { MongoClient, ObjectId } from 'mongodb';
import type { Message } from '../models/Message';

export class MessagesService {
  private client: MongoClient;
  private dbName: string = 'MarketPlace';
  private collectionName: string = 'Messages';

  constructor(client: MongoClient) {
    this.client = client;
  }

  /**
   * Fetch all messages for a given conversation, sorted by createdAt ascending
   */
  async getMessagesByConversationId(
    conversationId: string,
  ): Promise<Message[]> {
    try {
      const db = this.client.db(this.dbName);
      const collection = db.collection<Message>(this.collectionName);

      const messages = await collection
        .find({ conversationId: new ObjectId(conversationId) })
        .sort({ createdAt: 1 }) // 1 = ascending (oldest → newest)
        .toArray();

      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  /**
   * Create and store a new message document in MongoDB
   */
  async createMessage(
    conversationId: string,
    senderId: string,
    message: string,
    image?: string | null,
  ): Promise<Message> {
    console.log("create message with", conversationId, senderId, message)
    try {
      const db = this.client.db(this.dbName);
      const collection = db.collection<Message>(this.collectionName);

      const newMessage = {
        conversationId: new ObjectId(conversationId),
        senderId: new ObjectId(senderId),
        message: message,
        image: image || null,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newMessage);

      return {
        ...newMessage,
        _id: result.insertedId,
      };
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }
}
