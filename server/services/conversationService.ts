import { Collection, Db, MongoClient, ObjectId } from "mongodb";

const dbName = "MarketPlace";
const collectionName = "Conversations";

export async function getConversation(client: MongoClient, user1id: string, user2id: string) {
  const db: Db = client.db(dbName);
  const collection: Collection = db.collection(collectionName);
  
  const queryId = [user1id, user2id].sort().join("_");
  
  const record = await collection.findOne({ 
    conversationid:  queryId })

    return record
  }

export async function addConversation(client: MongoClient, user1id: string, user2id: string) {
 
  const db: Db = client.db(dbName);
  const collection: Collection = db.collection(collectionName);
  
  const sorted = [user1id, user2id].sort();
  const conversationid = sorted.join("_");
  
  const existing = await collection.findOne({ conversationid });
  
  if (existing) return existing._id;
  const record = await collection.insertOne({
    users: sorted,
    conversationid,
  });
  return record.insertedId;
}

/** List all conversations for a user (for GET /messages/conversations). */
export async function listConversationsForUser(client: MongoClient, userId: string) {
  
  const db: Db = client.db(dbName);
  const collection: Collection = db.collection(collectionName);
  
  const list = await collection.find({ users: userId }).toArray();
  
  return list;
}
