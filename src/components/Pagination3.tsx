import { Dispatch, SetStateAction } from 'react';

type Props = {
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

const Pagination = ({ totalPages, setPage, currentPage }: Props) => {
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
    currentPage === 1
      ? currentPage + 2
      : currentPage === totalPages
      ? currentPage
      : currentPage + 1;

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
