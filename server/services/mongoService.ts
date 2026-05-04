import { MongoClient, ServerApiVersion } from 'mongodb';

export async function startMongoClient() {
  const connectionString: string =
    process.env.MONGO_CONNECTION_STRING || "";

  console.log("Mongo connection string:", connectionString);

  const client = new MongoClient(connectionString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully");
  } catch (e) {
    console.error("Could not connect to MongoDB:", e);
    throw e;
  }

  return client;
}
