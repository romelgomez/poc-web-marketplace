import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Delete uploaded resource by public IDs
 *
 *  Doc: http://cloudinary.com/documentation/admin_api#delete_uploaded_images_by_public_ids
 *
 * */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    if (typeof req.query.resources !== 'undefined') {
      let idList = [];

      if (Array.isArray(req.query.resources)) {
        idList = req.query.resources;
      } else {
        idList = [req.query.resources];
      }

      const result = await await cloudinary.api.delete_resources(idList);

      res.status(200).json(result);
    } else {
      res.status(400).send({ error: 'Bad Request!' });
    }
  }
}
