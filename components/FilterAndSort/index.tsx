// C:\Users\pavel.kuplensky\js\grisha-project\components\FilterAndSort\index.tsx
import React, { useEffect, useState} from 'react';

interface FilterType {
  Name: 'name';
  ID: 'id';
  Height: 'height';
}

interface SortType {
  ID: 'id';
  Name: 'name';
  Height: 'height';
}

interface FilterAndSortProps {
  filterType: FilterType;
  filterValue: string;
  handleFilterTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFilterValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortType: SortType;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({ filterType, filterValue, handleFilterTypeChange, handleFilterValueChange, sortType, handleSortChange }) => {
  const [sortTypeValue, setSortType] = useState<SortType>({ ID: 'id', Name: 'name', Height: 'height' });

  useEffect(() => {
    setSortType(sortType);
  }, [sortType]);

  return (
    <div>
      <select onChange={handleFilterTypeChange}>
        <option value={filterType.Name}>Имя</option>
        <option value={filterType.id}>ID</option>
        <option value={filterType.Height}>Высота</option>
      </select>
      <input type="text" onChange={handleFilterValueChange} placeholder="Фильтр..." value={filterValue} />
      <select onChange={handleSortChange}>
        <option value={sortTypeValue.id}>ID</option>
        <option value={sortTypeValue.Name}>Имя</option>
        <option value={sortTypeValue.Height}>Высота</option>
      </select>
    </div>
  );
};

export default FilterAndSort;