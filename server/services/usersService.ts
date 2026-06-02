import { MongoClient, ObjectId } from 'mongodb';

export async function getUserById(client: MongoClient, id: string) {
  const document = await client
    .db('MarketPlace')
    .collection('users')
    .findOne({ _id: new ObjectId(id) });
  return document;
}
