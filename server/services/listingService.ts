import { MongoClient, ObjectId } from "mongodb";

/**
 * Get all listings from the database.
 * @param client: The MongoClient object.
 * @returns An array containing all listings in the database.
 */
export async function getAllListings(client: MongoClient) {
  const listings = client.db("MarketPlace").collection("Listings").find();
  return listings.toArray();
}

/**
 * Get a listing from the database.
 * @param client: The MongoClient object.
 * @param id ID of the listing to get.
 * @returns An object representing the listing.
 */
export async function getListing(client: MongoClient, id: string) {
    const listing = await client.db("MarketPlace").collection("Listings").findOne({ _id: new ObjectId(id)});
    return listing;
}

/**
 * Create a new listing in the database.
 * @param client: The MongoClient object.
 * @param sellerId: The user ID of the listing owner (from auth).
 * @param title: The title of the new listing.
 * @param desc: A description of the new listing.
 * @param price: The price of the new listing.
 * @param category: The category the new listing falls under.
 * @param stock: The quantity available of the new listing.
 * @returns The newly created Listing's id.
 */

export async function createListing(client: MongoClient, sellerId: string, title: string, desc: string,
                                    price: number, category: string, stock: number) {
    const myDB = client.db("MarketPlace");
    const myColl = myDB.collection("Listings");
    const doc = { sellerId: new ObjectId(sellerId), title, desc, price, category, stock };
    const result = await myColl.insertOne(doc);
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId;
  }


/**
 * Update a listing in the database.
 * @param client: The MongoClient object.
 * @param id Represents the ID of the listing to update.
 * @param title: The title of the new listing.
 * @param desc: A description of the new listing.
 * @param price: The price of the new listing.
 * @param category: The category the new listing falls under.
 * @param stock: The quantity available of the new listing.
 * Update a listing. Only the seller can update.
 * @returns Result; if listing not found or not owned by sellerId, result.matchedCount is 0.
 */
export async function updateListing(client: MongoClient, id: string, sellerId: string, title: string, 
                                    desc: string, price: number, category: string, 
                                    stock: number) {
    const myDB = client.db("MarketPlace");
    const myColl = myDB.collection("Listings");
    const filter = { _id: new ObjectId(id), sellerId: new ObjectId(sellerId) };
    const updateDoc = {
        $set: {
            title,
            desc,
            price,
            category,
            stock
        },
    };
    const result = await myColl.updateOne(filter, updateDoc);
    return result;
  }

/**
 * Delete a single Listing from the database. Only the seller can delete.
 * @param client: The MongoClient object.
 * @param id Represents the ID of the listing to update.
 * @returns Delete result; if not found or not owned by sellerId, deletedCount is 0.
 */
export async function deleteListing(client: MongoClient, id: string, sellerId: string) {
  const myDB = client.db("MarketPlace");
  const myColl = myDB.collection("Listings");
  const filter = { _id: new ObjectId(id), sellerId: new ObjectId(sellerId) };
  const deleteResult = await myColl.deleteOne(filter);
  return deleteResult;
}
