import { prisma } from "../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, bio } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        bio,
      },
    });

    res.status(201).json(user);
      
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
      
}

export default handler;

