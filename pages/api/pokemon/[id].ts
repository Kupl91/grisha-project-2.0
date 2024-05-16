// grisha-project-2.0\pages\api\pokemon\[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  // const { query } = req;
  // const crud = query.id;
  // if (crud === "govno") {

  // } else if (crud === "delete" {

  // })

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
          abilities :{
            createMany:{
              data:
              abilities.map((ability)=>{
                return{ ability}
             })
},
},
        
 },
  
     });

     return res.status(201).json(newPokemon);

    } catch (error) {
       console.error("Ошибка при создании нового покемона", error.message);
       return res.status(500).json({ message: error.message });
    }

  } else if (method === 'GET') {
    try {
      const { id } = req.query;
      const pokemon = await prisma.pokemon.findUnique({
        where: { id: Number(id) },
        include: { abilities: { select: { ability: { select: { name: true } } } } }
      });

      if (pokemon) {
        return res.status(200).json(pokemon);
      }

      return res.status(404).json({ message: 'Покемон не найден' });
    } catch (error) {
      console.error("Ошибка получения покемонов:", error);
      return res.status(500).json({ message: error.message });
    }

  } else if (method === 'DELETE') {
    try {
      const { id } = req.query;
      await prisma.$transaction([
        prisma.pokemonAbility.deleteMany({
          where: { pokemonId: Number(id) }
        }),
        prisma.pokemon.delete({
          where: { id: Number(id) }
        })
      ]);
      res.status(200).json({ message: 'Покемон успешно удален' });

    } catch (error) {
      console.error("Ошибка при удалении покемона:", error);
      res.status(500).json({ error: 'Ошибка при удалении покемона' + error.message });
    }

  } else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    res.status(405).end(`/Метод ${method} не поддерживается`);
  }
}