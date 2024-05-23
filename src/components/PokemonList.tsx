// C:\Users\pavel.kuplensky\js\grisha-project\components\PokemonList.tsx
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
  handleUpdateSubmit: () => void;
  handleUpdateClick: (id: number) => void; // Добавьте эту строку
  handleUpdateInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDetail: Pokemon | null;
  updatingPokemon: Pokemon | null;
  currentPage: number;
  itemsPerPage: number;
}

const PokemonList = ({ pokemons, handleDeleteClick, handleDetailsClick, handleUpdateSubmit, handleUpdateClick, handleUpdateInputChange, selectedDetail, updatingPokemon, currentPage, itemsPerPage }) => {
  return (
    <div>
      {pokemons
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((pokemon) => (
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
                <input type="text" name="name" value={updatingPokemon.name} onChange={handleUpdateInputChange} placeholder="Имя" />
                <input type="number" name="weight" value={updatingPokemon.weight} onChange={handleUpdateInputChange} placeholder="Вес" />
                <input type="number" name="height" value={updatingPokemon.height} onChange={handleUpdateInputChange} placeholder="Высота" />
                <input type="text" name="species" value={updatingPokemon.species} onChange={handleUpdateInputChange} placeholder="Вид" />
                <input type="number" name="experience" value={updatingPokemon.experience} onChange={handleUpdateInputChange} placeholder="Опыт" />
                <button onClick={handleUpdateSubmit}>Отправить</button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default PokemonList;
