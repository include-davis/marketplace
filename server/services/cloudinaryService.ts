import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

/**
 * Generate signed upload params for the frontend to upload directly to Cloudinary.
 * @param folder - The Cloudinary folder to upload into (e.g. 'listings').
 * @returns An object containing the signature, timestamp, api_key, and cloud_name.
 */
export function generateUploadSignature(folder: string = 'listings') {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET || '',
  );

  return {
    signature,
    timestamp,
    folder,
    api_key: process.env.CLOUDINARY_API_KEY || '',
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  };
}

export async function deleteListingImage(id: string) {
  const result = await cloudinary.uploader.destroy(id);
  return result;
}

export async function deleteAllListingImages(ids: string[]) {
  const deletedImages = [];
  for (const id of ids) {
    const result = await cloudinary.uploader.destroy(id);
    deletedImages.push(result);
  }
  return deletedImages;
}
