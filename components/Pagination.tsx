// src/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, previousPage }) => {
  return (
    <div>
      <button onClick={previousPage} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Предыдущая</button>
      <button onClick={nextPage} style={{ padding: '5px 10px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Следующая</button>
      <div>Страница {currentPage} из {totalPages}</div>
    </div>
  );
};

export default Pagination;
