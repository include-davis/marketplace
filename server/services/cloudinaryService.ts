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
