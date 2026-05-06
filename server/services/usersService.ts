import { MongoClient, ObjectId } from 'mongodb';


export async function getDocument(client: MongoClient, id: string) {
  const listing = await client
    .db('MarketPlace')
    .collection('Listings')
    .findOne({ _id: new ObjectId(id) });
  return listing;
}
