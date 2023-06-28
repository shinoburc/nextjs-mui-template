// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export const isValidToken = async (req: NextApiRequest) => {
  const token = await getToken({ req });
  if (token) {
    // Authorized
    return true;
  } else {
    // Unauthorized
    return false;
  }
};
