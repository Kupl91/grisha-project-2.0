//C:\Users\pavel.kuplensky\js\grisha-project\pages\api\pokemon\[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const pokemon = await prisma.pokemon.findUnique({
    where: { id: Number(id) },
    include: { abilities: { select: { ability: { select: { name: true } } } } }
  });

  if (pokemon) {
    res.status(200).json(pokemon);
  } else {
    res.status(404).json({ message: 'Покемон не найден' });
  }
}
