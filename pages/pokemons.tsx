// C:\Users\pavel.kuplensky\js\grisha-project\pages\pokemons.tsx
import React, { useEffect, useState } from 'react';
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
    handleUpdateClick,
    handleSortChange,
    handleFilterTypeChange,
    handleFilterValueChange,
    sortedAndFilteredPokemons,
    handleUpdateInputChange,
    handleInputChange,
    showForm, 
    handleCreateClick, 
  } = usePokemonActions();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPokemons();
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <FilterAndSort 
        handleSortChange={handleSortChange} 
        handleFilterTypeChange={handleFilterTypeChange}
        handleFilterValueChange={handleFilterValueChange}
      />
      <PokemonList
        pokemons={sortedAndFilteredPokemons}
        handleDeleteClick={handleDeleteClick}
        handleDetailsClick={handleDetailsClick}
        handleUpdateSubmit={handleUpdateSubmit}
        handleUpdateClick={handleUpdateClick}
        handleUpdateInputChange={handleUpdateInputChange}
        selectedDetail={selectedDetail}
        updatingPokemon={updatingPokemon}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={Math.ceil(sortedAndFilteredPokemons.length / itemsPerPage)}
        nextPage={nextPage}
        previousPage={previousPage}
      />
      <PokemonForm
       handleSubmitClick={handleSubmitClick}
       handleInputChange={handleInputChange}
       handleCreateClick={handleCreateClick}
       newPokemon={newPokemon}
       showForm={showForm} 
      />

    </div>
  );
};

export default PokemonsPage;
