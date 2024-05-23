// C:\Users\pavel.kuplensky\js\grisha-project\components\FilterAndSort.tsx
import React from 'react';

interface FilterAndSortProps {
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({ handleSortChange, handleFilterTypeChange, handleFilterValueChange }) => {
  return (
    <div>
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
    </div>
  );
};

export default FilterAndSort;
