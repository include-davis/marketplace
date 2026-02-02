import { MongoClient, ServerApiVersion } from "mongodb";

export async function startMongoClient() {
    const connectionString: string = process.env.MONGO_CONNECTION_STRING || ""

    console.log("string: ", connectionString);
    //Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(connectionString,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );
    try {
        //Connect the client to the server (optional starting in v4.7)
        await client.connect();
        //Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (e) {
        console.log("could not connect to client:", e);
    }
    return client;
}