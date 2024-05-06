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
          ability: true
        }
      }
    }
  });

  console.log(pokemonsWithAbilities);
}

fetchPokemonData().then(getPokemonWithAbilities);
