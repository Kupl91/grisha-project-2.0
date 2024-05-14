// C:\Users\pavel.kuplensky\js\grisha-project\pages\pokemons.tsx
import React, { useEffect, useState } from 'react';

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

const PokemonsPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortType, setSortType] = useState('id');
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('/api/pokemons')
      .then(response => response.json())
      .then(data => {
        setPokemons(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      });
  }, []);

  const handleDetailsClick = async (id) => {
    if (selectedDetail && selectedDetail.id === id) {
      setSelectedDetail(null);
    } else {
      setSelectedDetail(null);
      try {
        const response = await fetch(`/api/pokemon/${id}`);
        if(response.ok){
          const pokemonData = await response.json();
          
          setSelectedDetail({
            id: pokemonData.id,
            abilities: pokemonData.abilities.map(a => a.ability.name).join(', '),
            experience: pokemonData.experience,
            height: pokemonData.height,
            weight: pokemonData.weight 
          });
        } else {
           throw new Error('Не удалось получить информацию о покемоне');
         }
        
      } catch (error) {
         console.error("Ошибка при загрузке данных:", error);
       }
     }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      const response = await fetch(`/api/pokemon/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPokemons(pokemons.filter((pokemon) => pokemon.id !== id));
      } else {
        throw new Error('Не удалось удалить покемона');
      }
    } catch (error) {
      console.error("Ошибка при удалении покемона:", error);
    }
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  const sortedAndFilteredPokemons = pokemons
    .filter((pokemon) => pokemon[filterType].toString().toLowerCase().includes(filterValue))
    .sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a[sortType] - b[sortType];
      }
    });

  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      <input type="text" onChange={handleFilterValueChange} placeholder="Фильтр..." />
      <select onChange={handleFilterTypeChange}>
        <option value="name">Имя</option>
        <option value="id">ID</option>
        <option value="height">Высота</option>
      </select>
      <select onChange={handleSortChange}>
        <option value="id">ID</option>
        <option value="name">Имя</option>
        <option value="height">Высота</option>
      </select>
      {sortedAndFilteredPokemons
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((pokemon) => (
          <div key={pokemon.id} style={{ marginBottom:'10px', display: 'flex', alignItems: 'center' }}>
            <button onClick={() => handleDeleteClick(pokemon.id)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Удалить</button>
            <h2 style={{ marginRight: '10px' }}>{pokemon.name}</h2>
            <button onClick={() => handleDetailsClick(pokemon.id)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Детали</button>
            {selectedDetail && selectedDetail.id === pokemon.id && 
              (<div>{`ID: ${selectedDetail.id}, Способности: ${selectedDetail.abilities}, Опыт: ${selectedDetail.experience}, Высота: ${selectedDetail.height}, Вес: ${selectedDetail.weight}`}</div>)
            }
          </div>
        ))}
      <button onClick={previousPage} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Предыдущая</button>
      <button onClick={nextPage} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Следующая</button>
      <div>Страница {currentPage} из {totalPages}</div>
    </div>
  );
};

export default PokemonsPage;
