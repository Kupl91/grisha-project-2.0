// grisha-project-2.0\pages\pokemons.tsx
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
  const [showForm, setShowForm] = useState(false);
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    weight: 0,
    height: 0,
    species: '',
    experience: 0,
  });
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updatingPokemon, setUpdatingPokemon] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('/api/pokemons');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        
        setPokemons(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
         console.error("Ошибка при загрузке покемонов:", error.message); 
      }
    };
  
    fetchPokemons();
  }, []);

  const handleDetailsClick = async (id) => {
    if (selectedDetail && selectedDetail.id === id) {
      setSelectedDetail(null);
    } else {
      setSelectedDetail(null);
      try{
     const response=await fetch(`/api/pokemon/${id}`);
  if(response.ok){
  const pokemonData=await response.json();
  setSelectedDetail({
            id:pokemonData.id,
  experience:pokemonData.experience,
  height:pokemonData.height,
  weight:pokemonData.weight});
  } else{
  throw newError ('Не удалось получить информацию о покемоне');
  }
  }
       catch(error){
  console.error("Ошибка при загрузке данных:",error);   
  }}
  };

  const handleDeleteClick = async (id: number) => {
    try {
      const response = await fetch(`/api/pokemon/delete?id=${id}`, {
        method: 'DELETE',
      });
      console.log(response);
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
  .filter((pokemon) => pokemon[filterType]?.toString().toLowerCase().includes(filterValue))
  .sort((a, b) => {
    if (sortType === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a[sortType] - b[sortType];
    }
   });

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleSubmitClick = async () => {
    try {
      console.log(newPokemon);
      const response = await fetch('/api/pokemon/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPokemon.name,
          weight: newPokemon.weight,
          height: newPokemon.height,
          species: newPokemon.species,
          experience:newPokemon.experience, 
        }),
      });
    
      if (response.ok) {
        const pokemon = await response.json();
        setPokemons([...pokemons, pokemon]);
        setShowForm(false);
      } else {
        throw new Error('Не удалось создать покемона');
      }
    } catch (error) {
      console.error("Ошибка при создании покемона:", error.message);
    }
  };
  
  const handleUpdateClick = (id: number) => {
    if (updatingPokemon && updatingPokemon.id === id) {
      // Если форма обновления уже открыта для этого покемона, закройте ее
      setUpdatingPokemon(null);
    } else {
      // Иначе откройте форму обновления для этого покемона
      const pokemonToUpdate = pokemons.find((pokemon) => pokemon.id === id);
      setUpdatingPokemon(pokemonToUpdate ? {...pokemonToUpdate} : null);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch('/api/pokemon/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updatingPokemon.id,
          name: updatingPokemon.name,
          weight: updatingPokemon.weight,
          height: updatingPokemon.height,
          species: updatingPokemon.species,
          experience: updatingPokemon.experience,
        }),
      });
  
      if (response.ok) {
        const updatedPokemon = await response.json();
        setPokemons(pokemons.map((pokemon) => pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon));
        setUpdatingPokemon(null);
      } else {
        throw new Error('Не удалось обновить покемона');
      }
    } catch (error) {
      console.error("Ошибка при обновлении покемона:", error.message);
    }
  };

  const handleUpdateInputChange = (event) => {
    setUpdatingPokemon({
      ...updatingPokemon,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleInputChange = (event) => {
    if (event.target.name === 'id' && Number(event.target.value) < 26) {
      alert('ID не может быть меньше 26');
      return;
    }
    setNewPokemon({
      ...newPokemon,
      [event.target.name]: event.target.value,
    });
  };

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
        <button onClick={previousPage} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Предыдущая</button>
        <button onClick={nextPage} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Следующая</button>
        <button onClick={handleCreateClick} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Создай</button>
        {showForm && (
          <div>
            <input type="text" name="name" onChange={handleInputChange} placeholder="Имя" />
            <input type="number" name="weight" onChange={handleInputChange} placeholder="Вес" />
            <input type="number" name="height" onChange={handleInputChange} placeholder="Высота" />
            <input type="text" name="species" onChange={handleInputChange} placeholder="Вид" />
            <input type="number" name="experience" onChange={handleInputChange} placeholder="Опыт" />
            <button onClick={handleSubmitClick}>Отправить</button>
          </div>
        )}
        <div>Страница {currentPage} из {totalPages}</div>
      </div>
    );
  };
  
export default PokemonsPage;