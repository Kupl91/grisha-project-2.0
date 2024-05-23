//grisha-project-2.0\pages\api\pokemon\create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { name, weight, height, species, experience, abilities = [] } = req.body;

      // Валидация данных
      if (!name || !species || isNaN(weight) || isNaN(height) || isNaN(experience)) {
        return res.status(400).json({ message: "Неверные данные" });
      }

      // Проверка на существование покемона с таким именем
      const existingPokemon = await prisma.pokemon.findUnique({
        where: { name }
      });

      if (existingPokemon) {
        return res.status(400).json({ message: "Покемон с таким именем уже существует" });
      }

      // Создание нового покемона
      const newPokemon = await prisma.pokemon.create({
        data: {
          name,
          weight: Number(weight),
          height: Number(height),
          species,
          experience: Number(experience),
          abilities: {
            createMany: {
              data: abilities.map((ability) => ({ ability })),
            },
          },
        },
      });

      return res.status(201).json(newPokemon);
    } catch (error) {
      console.error('Ошибка при создании нового покемона', error.message);
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`/Метод ${method} не поддерживается`);
  }
}