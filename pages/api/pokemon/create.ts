// C:\Users\pavel.kuplensky\js\grisha-project\pages\api\pokemon\create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, name, weight, height, species, experience } = req.body;
  
    try{
      const createdPokemon = await prisma.pokemon.create({
        data: {
          id,
          name,
          weight,
          height,
          species,
          experience
        }
      });
  
      res.status(201).json(createdPokemon);
     
     } catch(error){
           console.error(error);
           res.status(500).json({ error:`Ошибка при создании покемона ${error.message}`});
     }
  } else {
    res.status(405).json({ error: 'Метод не поддерживается' });
  }
}
