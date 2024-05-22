// C:\Users\pavel.kuplensky\js\grisha-project\pages\api\PokemonActions.ts
import { useState, useEffect } from 'react';

export const usePokemonActions = () => {
  const [pokemons, setPokemons] = useState([]);
  const [sortType, setSortType] = useState('id');
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    weight: 0,
    height: 0,
    species: '',
    experience: 0,
  });
  const [updatingPokemon, setUpdatingPokemon] = useState(null);
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');

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

  const fetchPokemons = async () => {
    try {
      const response = await fetch('/api/pokemons');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPokemons(data);
    } catch (error) {
      console.error("Ошибка при загрузке покемонов:", error.message); 
    }
  };

  const handleDetailsClick = async (id) => {
    try {
      const response = await fetch(`/api/pokemon/${id}`);
      if (!response.ok) {
        throw new Error('Не удалось получить информацию о покемоне');
      }
      const pokemonData = await response.json();
      setSelectedDetail({
        id: pokemonData.id,
        experience: pokemonData.experience,
        height: pokemonData.height,
        weight: pokemonData.weight
      });
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);   
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`/api/pokemon/delete?id=${id}`, {
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

  const handleSubmitClick = async () => {
    try {
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
          experience: newPokemon.experience, 
        }),
      });
      if (response.ok) {
        const pokemon = await response.json();
        setPokemons([...pokemons, pokemon]);
      } else {
        throw new Error('Не удалось создать покемона');
      }
    } catch (error) {
      console.error("Ошибка при создании покемона:", error.message);
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
      } else {
        throw new Error('Не удалось обновить покемона');
      }
    } catch (error) {
      console.error("Ошибка при обновлении покемона:", error.message);
    }
  };

  return {
    pokemons,
    selectedDetail,
    newPokemon,
    updatingPokemon,
    fetchPokemons,
    handleDetailsClick,
    handleDeleteClick,
    handleSubmitClick,
    handleUpdateSubmit,
    handleSortChange,
    handleFilterTypeChange,
    handleFilterValueChange,
    sortedAndFilteredPokemons,
  };
};
