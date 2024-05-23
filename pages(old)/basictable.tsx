import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; 
import { Button } from "@/components/ui/button"; 
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';

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
  const itemsPerPage = 25;

  useEffect(() => {
    fetch('/api/pokemons')
      .then(response => response.json())
      .then(data => {
        setPokemons(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      });
  }, []);

  const handleDetailsClick = async (id) => {
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
          weight: pokemonData.weight // Добавлено
        });
      } else {
         throw new Error('Не удалось получить информацию о покемоне');
       }
      
    } catch (error) {
       console.error("Ошибка при загрузке данных:", error);
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
      <Table style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', overflow: 'hidden' }}>
        <TableCaption>Страница {currentPage} из {totalPages}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Высота</TableHead>
            <TableHead>Вес</TableHead>
            <TableHead>Опыт</TableHead>
            <TableHead>Способности</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredPokemons
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((pokemon) => (
              <TableRow key={pokemon.id}>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell>{pokemon.id}</TableCell>
                <TableCell>{pokemon.height}</TableCell>
                <TableCell>{pokemon.weight}</TableCell>
                <TableCell>{pokemon.experience}</TableCell>
                <TableCell>{pokemon.abilities.map(a => a.ability.name).join(', ')}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <button onClick={previousPage} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Предыдущая</button>
      <button onClick={nextPage} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Следующая</button>
    </div>
  );
};

export default PokemonsPage;
