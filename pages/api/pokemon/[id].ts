import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { id } = req.query;

  if (req.method === 'GET'){

    try{
      const pokemon = await prisma.pokemon.findUnique({
        where: { id: Number(id) },
        include: { abilities: { select: { ability: { select: { name: true } } } } }
      });

      if(pokemon){
        return res.status(200).json(pokemon);
      }
      
      return res.status(404).json({ message: 'Покемон не найден' });
    }
 
    catch(error){
      console.error("Ошибка получения покемонов:", error);
      return res.status(500).json({ message: error.message }); 
    }
  }

  else if(req.method === "DELETE") {

    try{
      await prisma.$transaction([
        prisma.pokemonAbility.deleteMany({
          where: { pokemonId: Number(id) }
        }),
        prisma.pokemon.delete({
          where: { id: Number(id) }
        })
      ]);

      res.status(200).json({ message: 'Покемон успешно удален' });
    } 
    catch(error){
      console.error("Ошибка при удалении покемона:", error);
      res.status(500).json({ error: 'Ошибка при удалении покемона ' + error.message });
    }
  }
  else{
    res.setHeader('Allow', 'GET', 'DELETE');
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
};
