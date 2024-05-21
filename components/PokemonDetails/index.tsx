// C:\Users\pavel.kuplensky\js\grisha-project\components\PokemonDetails\index.tsx
import React from 'react';
import  SelectedPokemon  from './SelectedPokemon';

interface PokemonDetailsProps {
  selectedPokemon: Pokemon | null;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ selectedPokemon }) => {
  return (
    <div>
      {selectedPokemon && (
        <SelectedPokemon pokemon={selectedPokemon} />
      )}
    </div>
  );
};

export default PokemonDetails;