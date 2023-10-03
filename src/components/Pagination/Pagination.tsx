// import React, { useState } from 'react';
// import ReactPaginate from 'react-paginate';

// interface PaginationProps {
//   pageCount: number; // Количество страниц
//   onPageChange: (selectedItem: { selected: number }) => void; // Обработчик смены страницы
// }

// const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
//   const [currentPage, setCurrentPage] = useState<number>(0);

//   const handlePageChange = (selectedItem: { selected: number }) => {
//     setCurrentPage(selectedItem.selected);
//     onPageChange(selectedItem);
//   };

//   return (
//     <ReactPaginate
//       pageCount={pageCount}
//       pageRangeDisplayed={2}
//       marginPagesDisplayed={1}
//       previousLabel={'Пред.'}
//       nextLabel={'След.'}
//       breakLabel={'...'}
//       breakClassName={'break-me'}
//       forcePage={currentPage}
//       onPageChange={handlePageChange}
//       containerClassName={'pagination'}
//       activeClassName={'active'}
//     />
//   );
// };

// export default Pagination;