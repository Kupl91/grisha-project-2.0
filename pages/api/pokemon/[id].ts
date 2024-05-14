// C:\Users\pavel.kuplensky\js\grisha-project\pages\api\pokemon\[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await prisma.pokemon.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: 'Покемон успешно удален' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при удалении покемона' });
    }
  } else if (req.method === 'GET') {
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
}
