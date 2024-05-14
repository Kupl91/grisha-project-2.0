import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      // Используем транзакцию для удаления записей
      await prisma.$transaction([
        // Удаляем все записи в таблице PokemonAbility, у которых pokemonId совпадает с id
        prisma.pokemonAbility.deleteMany({
          where: { pokemonId: Number(id) },
        }),
        // Удаляем запись в таблице Pokemon по id
        prisma.pokemon.delete({
          where: { id: Number(id) },
        }),
      ]);
      
      res.status(200).json({ message:'Покемон успешно удален'});
    } catch(error){
     console.log(error);
     res.status(500).json({ error:'Ошибка приудалении покемона '});
    }
   } else if (req.method === 'GET'){
    const pokemon=awaitprisma.pokemon.findUnique ({
       where:{id:Number(id)},
       include:{abilities:{ select:{ ability :{ select :{ name:true}}}}}
     });

if(pokemon){
   res .status(200).json(pokémon)}
else{
res .status(404 ).json ({message :'Покемоне найден'})}}}