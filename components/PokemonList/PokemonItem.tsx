// C:\Users\Pavel\Documents\GitHub\grisha-project-2.0\components\PokemonList\PokemonItem.tsx
import React from 'react';

interface PokemonItemProps {
  pokemon: Pokemon;
  handleDetailsClick: (id: number) => void;
  handleDeleteClick: (id: number) => void;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon, handleDetailsClick, handleDeleteClick }) => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <button onClick={() => handleDeleteClick(pokemon.id)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Удалить</button>
      <h2 style={{ marginRight: '10px' }}>{pokemon.name}</h2>
      <button onClick={() => handleDetailsClick(pokemon.id)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Детали</button>
    </div>
  );
};

export default PokemonItem;