import { Collection, Db, MongoClient, ObjectId } from "mongodb";

export async function getConversation(client: MongoClient, user1id: string, user2id: string) {
    
    const db : Db = client.db("MarketPlace")
    const collection : Collection = db.collection("Conversations")

    const record = await collection.findOne({
    "users": { $all: [user1id, user2id] }
})

    return record

}