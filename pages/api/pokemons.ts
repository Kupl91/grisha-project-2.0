// C:\Users\pavel.kuplensky\js\grisha-project\pages\api\pokemons.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pokemons = await prisma.pokemon.findMany({
    select: {
      id: true,
      name: true,
      weight: true,
      height: true,
      species: true,
      experience: true,
      abilities: {
        select: {
          ability: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      id: 'asc'
    }
  });

  res.status(200).json(pokemons);
}