//C:\Users\Pavel\Documents\GitHub\grisha-project-2.0\components\PokemonForm\index.tsx
import React, { useState } from 'react';
import  PokemonFormFields  from './PokemonFormFields.tsx';

interface PokemonFormProps {
  showForm: boolean;
  handleSubmitClick: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newPokemon: Pokemon;
}

const PokemonForm: React.FC<PokemonFormProps> = ({ showForm, handleSubmitClick, handleInputChange, newPokemon }) => {
  if (!showForm) {
    return null;
  }

  return (
    <div>
      <PokemonFormFields
        handleInputChange={handleInputChange}
        newPokemon={newPokemon}
      />
      <button onClick={handleSubmitClick}>Отправить</button>
    </div>
  );
};

export default PokemonForm;