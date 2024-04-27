import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchPokemonData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    const data = await response.json();
    const pokemons = data.results;

    for (const pokemon of pokemons) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      if (pokemonData) {
        console.log(pokemonData); // Выводим имя покемона в консоль

        await prisma.pokemon.create({
          data: {
            name: pokemonData.name,
            weight: pokemonData.weight,
            height: pokemonData.height,
            baseExperience: pokemonData.base_experience,
            species: pokemonData.species.name,
            experience: pokemonData.base_experience,
            abilities: {
              create: pokemonData.abilities.map(ability => ({
                name: ability.ability.name
              }))
            },
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchPokemonData();
