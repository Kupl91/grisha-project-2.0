// src/components/PokemonList.tsx
import React from 'react';

interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  baseExperience: number;
  species: string;
  experience: number;
  abilities: { ability: { name: string } }[];
}

interface PokemonListProps {
  pokemons: Pokemon[];
  handleDeleteClick: (id: number) => void;
  handleDetailsClick: (id: number) => void;
  handleUpdateClick: (id: number) => void;
  selectedDetail: Pokemon | null;
  updatingPokemon: Pokemon | null;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, handleDeleteClick, handleDetailsClick, handleUpdateClick, selectedDetail, updatingPokemon }) => {
  return (
    <div>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} style={{ marginBottom:'10px', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => handleDeleteClick(pokemon.id)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Удалить</button>
          <h2 style={{ marginRight: '10px' }}>{pokemon.name}</h2>
          <button onClick={() => handleDetailsClick(pokemon.id)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Детали</button>
          {selectedDetail && selectedDetail.id === pokemon.id && 
            (<div>{`ID: ${selectedDetail.id}, Опыт: ${selectedDetail.experience}, Высота: ${selectedDetail.height}, Вес: ${selectedDetail.weight}`}</div>)
          }
          <button onClick={() => handleUpdateClick(pokemon.id)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Обновить</button>
          {updatingPokemon && updatingPokemon.id === pokemon.id && (
            <div>
              {/* Здесь будет форма обновления */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
