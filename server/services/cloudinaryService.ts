import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryImage {
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Fetch all images stored in a Cloudinary folder whose name matches folder name.
 * @param folderId The folder name (typically a listing/data ID).
 * @returns An array of image metadata objects.
 */
export async function getImagesByFolder(
  folderId: string,
): Promise<CloudinaryImage[]> {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.search
    .expression(`folder="listings/${folderId}"`)
    .max_results(100)
    .execute();

  console.log(
    `Cloudinary search for folder "${folderId}": ${result.total_count} result(s)`,
  );

  return result.resources.map(
    (resource: {
      url: string;
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      format: string;
    }) => ({
      url: resource.url,
      secureUrl: resource.secure_url,
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      format: resource.format,
    }),
  );
}
let configured = false;

/**
 * Ensures Cloudinary is configured exactly once.
 * Called lazily so that dotenv has already loaded env vars by the time this runs.
 */
function ensureConfigured() {
  if (configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
  });
  configured = true;
}

/**
 * Upload an image buffer to Cloudinary.
 * @param fileBuffer - The raw file data.
 * @param folder - The Cloudinary folder to upload into (defaults to 'uploads').
 * @returns An object containing the secure URL and public ID of the uploaded image.
 */
export function uploadImage(
  fileBuffer: Buffer,
  folder: string = 'uploads',
): Promise<{ url: string; publicId: string }> {
  ensureConfigured();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error || !result) {
          return reject(error ?? new Error('Cloudinary upload failed'));
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(fileBuffer);
  });
}


export async function deleteListingImage(id: string) {
  ensureConfigured();
  const result = await cloudinary.uploader.destroy(id);
  return result;
}

export async function deleteAllListingImages(ids: string[]) {
  ensureConfigured();
  const deletedImages = [];
  for (const id of ids) {
    const result = await cloudinary.uploader.destroy(id);
    deletedImages.push(result);
  }
  return deletedImages;
}
