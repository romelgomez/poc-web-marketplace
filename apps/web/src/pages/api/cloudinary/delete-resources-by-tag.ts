import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Delete all resources with the given tag name.
 *
 * Doc: http://cloudinary.com/documentation/admin_api#delete_resources_by_tags
 *
 * */

export default async function handler(
  req: NextApiRequest,
  // res: NextApiResponse<Data>
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    if (typeof req.query.tag !== 'undefined') {
      const result = await cloudinary.api.delete_resources_by_tag(
        req.query.tag as string,
      );

      res.status(200).json(result);
    } else {
      res.status(400).send({ error: 'Bad Request!' });
    }
  }
}
