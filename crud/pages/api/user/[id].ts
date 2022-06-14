import { prisma } from "../../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id;

  try {
    if (req.method === "DELETE") {
      const user = await prisma.user.delete({
        where: { id: Number(userId) },
      });
      res.json(user);
    }else{
        console.log('user could not be created')
    }

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default handler;
