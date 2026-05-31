import { Collection, Db, MongoClient } from 'mongodb';

export async function addConversation(
  client: MongoClient,
  listingId: string,
  user1id: string,
  user2id: string,
) {
  const db: Db = client.db('MarketPlace');
  const collection: Collection = db.collection('Conversations');

  const record = await collection.insertOne({
    users: [user1id, user2id],
    listingId: listingId,
    conversationid: user1id + '_' + user2id,
  });

  return record.insertedId;
}

export async function getConversationByListing(
  client: MongoClient,
  listingId: string,
) {
  const db: Db = client.db('MarketPlace');
  const collection: Collection = db.collection('Conversations');
  const records = await collection.find({ listing: listingId }).toArray();
}
