// src/components/PokemonForm.tsx
import React from 'react';

interface PokemonFormProps {
  handleSubmitClick: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newPokemon: {
    name: string;
    weight: number;
    height: number;
    species: string;
    experience: number;
  };
}

const PokemonForm: React.FC<PokemonFormProps> = ({ handleSubmitClick, handleInputChange, newPokemon }) => {
  return (
    <div>
      <input type="text" name="name" onChange={handleInputChange} placeholder="Имя" value={newPokemon.name} />
      <input type="number" name="weight" onChange={handleInputChange} placeholder="Вес" value={newPokemon.weight} />
      <input type="number" name="height" onChange={handleInputChange} placeholder="Высота" value={newPokemon.height} />
      <input type="text" name="species" onChange={handleInputChange} placeholder="Вид" value={newPokemon.species} />
      <input type="number" name="experience" onChange={handleInputChange} placeholder="Опыт" value={newPokemon.experience} />
      <button onClick={handleSubmitClick}>Отправить</button>
    </div>
  );
};

export default PokemonForm;
