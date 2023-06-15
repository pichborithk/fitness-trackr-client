import { Dispatch, SetStateAction } from 'react';

type Props = {
  routinesPerPage: number;
  totalRoutines: number;
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

const Pagination = ({
  routinesPerPage,
  totalRoutines,
  setPage,
  currentPage,
}: Props) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalRoutines / routinesPerPage);
  const firstButtonNumber =
    currentPage === 1
      ? currentPage
      : currentPage === totalPages
      ? currentPage - 2
      : currentPage - 1;

  const secondButtonNumber =
    currentPage === 1
      ? currentPage + 1
      : currentPage === totalPages
      ? currentPage - 1
      : currentPage;

  const thirdButtonNumber =
    currentPage === totalPages
      ? currentPage
      : currentPage === 1
      ? currentPage + 2
      : currentPage + 1;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // return (
  //   <div>
  //     <ul className='flex w-1/2 gap-2'>
  //       {pageNumbers.map(number => (
  //         <li key={number}>
  //           <button onClick={() => setPage(number)}>{number}</button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return (
    <div>
      <ul className='flex items-center gap-8 text-2xl'>
        <li>
          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className='fa-solid fa-chevron-left'></i>
          </button>
        </li>
        <li>
          <button
            className={`px-2 py-1 ${
              currentPage === firstButtonNumber ? 'border-2 font-bold' : ''
            }`}
            onClick={() => setPage(firstButtonNumber)}
            disabled={currentPage === firstButtonNumber}
          >
            {firstButtonNumber}
          </button>
        </li>
        <li>
          <button
            className={`px-2 py-1 ${
              currentPage === secondButtonNumber ? 'border-2 font-bold' : ''
            }`}
            onClick={() => setPage(secondButtonNumber)}
            disabled={currentPage === secondButtonNumber}
          >
            {secondButtonNumber}
          </button>
        </li>
        <li>
          <button
            className={`px-2 py-1 ${
              currentPage === thirdButtonNumber ? 'border-2 font-bold' : ''
            }`}
            onClick={() => setPage(thirdButtonNumber)}
            disabled={currentPage === thirdButtonNumber}
          >
            {thirdButtonNumber}
          </button>
        </li>
        <li>
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className='fa-solid fa-chevron-right'></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
