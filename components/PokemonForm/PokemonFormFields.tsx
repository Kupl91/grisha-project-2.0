// C:\Users\Pavel\Documents\GitHub\grisha-project-2.0\components\PokemonForm\PokemonFormFields.tsx
import React from 'react';

interface Pokemon {
  name: string;
  weight: number;
  height: number;
  species: string;
  experience: number;
}

interface PokemonFormFieldsProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newPokemon: Pokemon;
}

const PokemonFormFields: React.FC<PokemonFormFieldsProps> = ({ handleInputChange, newPokemon }) => (
  <div>
    <input type="text" name="name" value={newPokemon.name} onChange={handleInputChange} placeholder="Имя" />
    <input type="number" name="weight" value={newPokemon.weight} onChange={handleInputChange} placeholder="Вес" />
    <input type="number" name="height" value={newPokemon.height} onChange={handleInputChange} placeholder="Высота" />
    <input type="text" name="species" value={newPokemon.species} onChange={handleInputChange} placeholder="Вид" />
    <input type="number" name="experience" value={newPokemon.experience} onChange={handleInputChange} placeholder="Опыт" />
  </div>
);

export default PokemonFormFields;