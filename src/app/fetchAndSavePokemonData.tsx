import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchPokemonData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    const pokemons = data.results;

    for (const pokemon of pokemons) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      if (pokemonData) {
        console.log(pokemonData.name); // Выводим имя покемона в консоль

        await prisma.pokemon.create({
          data: {
            name: pokemonData.name,
            abilities: pokemonData.abilities.map(ability => ability.ability.name),
            types: pokemonData.types.map(type => type.type.name),
            sprite: pokemonData.sprites.front_default,
            shinySprite: pokemonData.sprites.front_shiny,
            locations: pokemonData.location_area_encounters,
            learnset: pokemonData.moves.map(move => move.move.name),
            stats: pokemonData.stats,
            weight: pokemonData.weight,
            height: pokemonData.height,
            baseExperience: pokemonData.base_experience,
            forms: pokemonData.forms.map(form => form.name),
            heldItems: pokemonData.held_items.map(item => item.item.name),
            generation: pokemonData.species.url,
            color: pokemonData.color.name,
            species: pokemonData.species.name,
            experience: pokemonData.base_experience,
            moves: pokemonData.moves.map(move => move.move.name),
            characteristics: pokemonData.abilities.map(ability => ability.ability.name),
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
