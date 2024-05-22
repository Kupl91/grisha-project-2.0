// C:\Users\pavel.kuplensky\js\grisha-project\pages\pokemons.tsx
import React, { useEffect } from 'react';
import FilterAndSort from '../components/FilterAndSort';
import Pagination from '../components/Pagination';
import PokemonList from '../components/PokemonList';
import PokemonForm from '../components/PokemonForm';
import { usePokemonActions } from './api/PokemonActions';

const PokemonsPage = () => {
  const {
    pokemons,
    selectedDetail,
    newPokemon,
    updatingPokemon,
    fetchPokemons,
    handleDetailsClick,
    handleDeleteClick,
    handleSubmitClick,
    handleUpdateSubmit,
  } = usePokemonActions();

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <FilterAndSort />
      <PokemonList
        pokemons={pokemons}
        handleDeleteClick={handleDeleteClick}
        handleDetailsClick={handleDetailsClick}
        handleUpdateClick={handleUpdateSubmit}
        selectedDetail={selectedDetail}
        updatingPokemon={updatingPokemon}
      />
      <Pagination />
      <PokemonForm
        handleSubmitClick={handleSubmitClick}
        handleInputChange={(event) => setNewPokemon({
          ...newPokemon,
          [event.target.name]: event.target.value,
        })}
        newPokemon={newPokemon}
      />
    </div>
  );
};

export default PokemonsPage;