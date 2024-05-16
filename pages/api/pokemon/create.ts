import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

}