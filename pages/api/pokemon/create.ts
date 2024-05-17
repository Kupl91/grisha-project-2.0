<<<<<<< HEAD
=======
//grisha-project-2.0\pages\api\pokemon\create.ts
>>>>>>> 61245e4bddb22a9d37c1395c23045fc798be2bdf
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
<<<<<<< HEAD
 if (req.method === 'POST') {
   try {
     const { name, weight, height, baseExperience, species ,experience ,abilities} = req.body;

     if (!name || !weight || !height || !baseExperience || !species) {
       return res.status(400).json({ error: "Все поля обязательны" });
     }

     const createdPokemon = await prisma.pokemon.create({
       data:{
         name,
         weight,
         height,
         baseExperience,
         species,
         experience: experience ?? 0,
         abilities: abilities && abilities.length ? 
           { create : abilities.map(a => ({ abilityName:a })) }
           : undefined
       }
     });

    res.status(201).json(createdPokemon);

  } catch (error) {
    console.error("Ошибка при создании покемона:", error);
    return res.status(500).json({ error:`Ошибка при создании покемона ${error.message}`});
  }
 } else {
   res.setHeader('Allow', ['POST']);
   return res.status(405).end(`Метод ${req.method} не поддерживается`);
 }

=======
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
>>>>>>> 61245e4bddb22a9d37c1395c23045fc798be2bdf
}