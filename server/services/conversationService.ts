import { Collection, Db, MongoClient, ObjectId } from 'mongodb';

export async function addConversation(
  client: MongoClient,
  listingId: ObjectId,
  user1id: string,
  user2id: string,
) {
  const db: Db = client.db('MarketPlace');
  const collection: Collection = db.collection('Conversations');

  const record = await collection.insertOne({
    users: [user1id, user2id],
    listingId,
    user1id,
    user2id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return record.insertedId;
}

export async function getConversationByListing(
  client: MongoClient,
  listingId: string,
) {
  const db: Db = client.db('MarketPlace');
  const collection: Collection = db.collection('Conversations');
  const record = await collection.findOne({ listing: listingId });
  return record;
}

export async function updateConversationUpdated(
  client: MongoClient,
  listingId: string,
) {
  const db = client.db('MarketPlace');
  const collection = db.collection('Conversations');
  const filter = { _id: new ObjectId(listingId) };
  const updateDoc = {
    $set: {
      updatedAt: new Date(),
    },
  };
  const result = await collection.updateOne(filter, updateDoc);
  return result;
}
