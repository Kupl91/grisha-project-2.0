// grisha-project-2.0\pages\api\pokemon\update.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'PUT') {
    try {
      const { id, name, weight, height, species, experience, abilities = [] } = req.body;

      // Валидация данных
      if (!id || isNaN(id) || !name || !species || isNaN(weight) || isNaN(height) || isNaN(experience)) {
        return res.status(400).json({ message: "Неверные данные" });
      }

      // Проверка на существование покемона с данным id
      const existingPokemon = await prisma.pokemon.findUnique({
        where: { id: Number(id) },
      });

      if (!existingPokemon) {
        return res.status(404).json({ message: "Покемон не найден" });
      }

      // Обновление информации о покемоне
      const updatedPokemon = await prisma.pokemon.update({
        where: { id: Number(id) },
        data: {
          name,
          weight: Number(weight),
          height: Number(height),
          species,
          experience: Number(experience),
        },
      });

      // Удаление старых способностей и добавление новых
      await prisma.pokemonAbility.deleteMany({
        where: { pokemonId: Number(id) },
      });

      await prisma.pokemonAbility.createMany({
        data: abilities.map((ability) => ({
          ability,
          pokemonId: Number(id),
        })),
      });

      res.status(200).json(updatedPokemon);
    } catch (error) {
      console.error('Ошибка при обновлении покемона', error.message);
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`/Метод ${method} не поддерживается`);
  }
}