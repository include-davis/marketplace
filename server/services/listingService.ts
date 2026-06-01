import { MongoClient, ObjectId } from 'mongodb';

/**
 * Get all listings from the database.
 * @param client: The MongoClient object.
 * @returns An array containing all listings in the database.
 */
export async function getAllListings(client: MongoClient) {
  const listings = client.db('MarketPlace').collection('Listings').find();
  return listings.toArray();
}

/**
 * Get a listing from the database.
 * @param client: The MongoClient object.
 * @param id ID of the listing to get.
 * @returns An object representing the listing.
 */
export async function getListing(client: MongoClient, id: string) {
  const listing = await client
    .db('MarketPlace')
    .collection('Listings')
    .findOne({ _id: new ObjectId(id) });
  return listing;
}

/**
 * Create a new listing in the database.
 * @param client: The MongoClient object.
 * @param title: The title of the new listing.
 * @param desc: A description of the new listing.
 * @param price: The price of the new listing.
 * @param category: The category the new listing falls under.
 * @param stock: The quantity available of the new listing.
 * @returns The newly created Listing's id.
 */
export async function createListing(
  client: MongoClient,
  title: string,
  desc: string,
  price: number,
  category: string,
  materialProperty: string,
  condition: string,
  images: string[],
) {
  const myDB = client.db('MarketPlace');
  const myColl = myDB.collection('Listings');
  const doc = {
    title,
    desc,
    price,
    category,
    materialProperty,
    condition,
    createdAt: new Date(),
    images,
  };
  const result = await myColl.insertOne(doc);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
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
 */
export async function updateListing(
  client: MongoClient,
  id: string,
  title: string,
  desc: string,
  price: number,
  category: string,
  materialProperty: string,
  condition: string,
  images: string[],
) {
  const myDB = client.db('MarketPlace');
  const myColl = myDB.collection('Listings');
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      title,
      desc,
      price,
      category,
      materialProperty,
      condition,
      images,
    },
  };
  const result = await myColl.updateOne(filter, updateDoc);
  return result;
}

/**
 * Delete a single Listing from the database.
 * @param client: The MongoClient object.
 * @param id Represents the ID of the listing to update.
 */
export async function deleteListing(client: MongoClient, id: string) {
  const myDB = client.db('MarketPlace');
  const myColl = myDB.collection('Listings');
  const filter = { _id: new ObjectId(id) };
  const deleteResult = await myColl.deleteOne(filter);
  return deleteResult;
}

export async function addListingImages(
  client: MongoClient,
  id: string,
  imagePaths: string[],
) {
  const MAX_IMAGES = 5;
  const myDB = client.db('MarketPlace');
  const myColl = myDB.collection('Listings');
  const filter = { _id: new ObjectId(id) };

  // Fetch the listing to check the current image count
  const listing = await myColl.findOne(filter);
  if (!listing) {
    throw new Error(`Listing with id ${id} not found`);
  }

  const existingCount = Array.isArray(listing.images)
    ? listing.images.length
    : 0;
  if (existingCount + imagePaths.length > MAX_IMAGES) {
    throw new Error(
      `Cannot add ${imagePaths.length} image(s). Listing already has ${existingCount} image(s) (max ${MAX_IMAGES}).`,
    );
  }

  const imagePush = {
    $push: {
      images: { $each: imagePaths },
    },
  };
  const result = await myColl.updateOne(filter, imagePush as any);
  return result;
}
