// C:\Users\pavel.kuplensky\js\grisha-project\pages\api\pokemon\[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET'){
    const pokemon = await prisma.pokemon.findUnique ({
       where:{id:Number(id)},
       include:{abilities:{ select:{ ability :{ select :{ name:true}}}}}
     });

    if(pokemon){
       res.status(200).json(pokemon);
    } else {
       res.status(404).json({message :'Покемон не найден'});
    }
  } else if (req.method === 'DELETE') {
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
     res.status(500).json({ error:'Ошибка при удалении покемона '});
    }
  } else if (req.method === 'POST') { // обработка POST-запроса
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
  }
}
