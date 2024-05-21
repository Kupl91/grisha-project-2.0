// C:\Users\Pavel\Documents\GitHub\grisha-project-2.0\components\PokemonList\index.tsx
import React from 'react';
import  PokemonItem  from './PokemonItem';

interface PokemonListProps {
  pokemons: Pokemon[];
  handleDetailsClick: (id: number) => void;
  handleDeleteClick: (id: number) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, handleDetailsClick, handleDeleteClick }) => {
  return (
    <div>
      {pokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon.id}
          pokemon={pokemon}
          handleDetailsClick={handleDetailsClick}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
};

export default PokemonList;