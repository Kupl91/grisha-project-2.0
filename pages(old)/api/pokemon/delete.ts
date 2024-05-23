//Grisha-project-2.0\pages\api\pokemon\delete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'DELETE') {
    try {
      const { id } = req.query;
      await prisma.$transaction([
        prisma.pokemonAbility.deleteMany({
          where: { pokemonId: Number(id) },
        }),
        prisma.pokemon.delete({
          where: { id: Number(id) },
        }),
      ]);
      res.status(200).json({ message: 'Покемон успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении покемона:', error);
      res.status(500).json({ error: 'Ошибка при удалении покемона' + error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`/Метод ${method} не поддерживается`);
  }
}