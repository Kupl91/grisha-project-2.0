// C:\Users\pavel.kuplensky\js\grisha-project\pages\pokemons.tsx

import PokemonForm from "../components/PokemonForm";
import PokemonList from "../components/PokemonList";
import { usePokemonActions } from "./api/PokemonActions";
import FilterAndSort from "/src/components/FilterAndSort.tsx";
import Pagination from "C:/Users/gbrit/OneDrive/Desktop/PROJEct/grisha-project-2.0/src/components/FilterAndSort.tsx";
import React, { useEffect, useState } from "react";

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
    currentPage,
    itemsPerPage,
    previousPage,
    nextPage,
  } = usePokemonActions();

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
