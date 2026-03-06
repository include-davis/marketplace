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

  //Delete a message by id. Returns true if deleted, false if not found or not sender.
  async deleteMessage(messageId: string, senderId: string): Promise<boolean> {
    const db = this.client.db(this.dbName);
    const collection = db.collection<Message>(this.collectionName);
    const result = await collection.deleteOne({
      _id: new ObjectId(messageId),
      senderId: new ObjectId(senderId),
    });
    return result.deletedCount === 1;
  }
}

//Read receipt: one doc per user per conversation with last read time. 
export interface ReadReceipt {
  conversationId: ObjectId;
  userId: ObjectId;
  readAt: Date;
}

export function getReadReceiptsCollection(client: MongoClient) {
  return client.db("MarketPlace").collection<ReadReceipt>("readReceipts");
}

export async function markConversationRead(
  client: MongoClient,
  conversationId: string,
  userId: string
): Promise<void> {
  const coll = getReadReceiptsCollection(client);
  await coll.updateOne(
    {
      conversationId: new ObjectId(conversationId),
      userId: new ObjectId(userId),
    },
    { $set: { readAt: new Date() } },
    { upsert: true }
  );
}
