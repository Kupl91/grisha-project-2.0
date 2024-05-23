// C:\Users\Pavel\Documents\GitHub\grisha-project-2.0\src\app\api\pokemon\[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const { id } = req.query;
      const pokemon = await prisma.pokemon.findUnique({
        where: { id: Number(id) },
        include: { abilities: true }, // Убедимся, что включем способности правильно
      });

      if (pokemon) {
        return res.status(200).json(pokemon);
      }

      return res.status(404).json({ message: 'Покемон не найден' });
    } catch (error) {
      console.error('Ошибка получения покемонов:', error);
       return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
     res.status(405).end(`/Метод ${method} не поддерживается`);
  }
}
