import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

async function fetchPokemonData() {
  // Ваш существующий код...
}

async function getPokemonWithAbilities() {
  const pokemonsWithAbilities = await prisma.pokemon.findMany({
    include: {
      abilities: {
        include: {
          ability: {
            select: { name: true }
          }
        }
      }
    }
  });

  // Вывод информации о каждом покемоне и его способностях
  pokemonsWithAbilities.forEach(pokemon => {
    console.log(`Покемон ${pokemon.name} имеет следующие способности:`);
    pokemon.abilities.forEach(pa => console.log(`${pa.ability.name}`));
  });
}

fetchPokemonData().then(getPokemonWithAbilities);