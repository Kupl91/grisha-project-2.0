// C:\Users\Pavel\Documents\GitHub\grisha-project-2.0\components\PokemonDetails\SelectedPokemon.tsx
import React from 'react';

interface SelectedPokemonProps {
  pokemon: Pokemon;
}

const SelectedPokemon: React.FC<SelectedPokemonProps> = ({ pokemon }) => {
  return (
    <div>
      {`ID: ${pokemon.id}, Опыт: ${pokemon.experience}, Высота: ${pokemon.height}, Вес: ${pokemon.weight}`}
    </div>
  );
};

export default SelectedPokemon;