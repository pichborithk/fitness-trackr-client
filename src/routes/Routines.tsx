import { Link, useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import {
  Pagination,
  // Pagination3,
  RoutineCard,
  SearchInput,
} from '../components';
import { useEffect, useState } from 'react';

const Routines = () => {
  const { publicRoutines, userData, setRoute, route } =
    useOutletContext<RootContext>();
  const [keyword, setKeyword] = useState('');
  const [routinesFiltered, setRoutinesFiltered] = useState(publicRoutines);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!publicRoutines) return;
    const filteredRoutines = publicRoutines.filter(
      routine =>
        routine.name.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
        keyword === ''
    );
    // filteredRoutines.sort((prevRoutine, nextRoutine) => {
    //   const prevRoutineDate = new Date(prevRoutine.updatedAt);
    //   const nextRoutineDate = new Date(nextRoutine.updatedAt);
    //   return nextRoutineDate.getTime() - prevRoutineDate.getTime();
    // });
    setRoutinesFiltered(filteredRoutines);
  }, [keyword, publicRoutines]);

  useEffect(() => {
    setRoute('routines');
  }, []);

  const routinesPerPage = 10;
  const indexOfFirstRoutinesNextPage = currentPage * routinesPerPage;
  const indexOfFirstRoutines = indexOfFirstRoutinesNextPage - routinesPerPage;
  const routinesOfCurrentPage = routinesFiltered.slice(
    indexOfFirstRoutines,
    indexOfFirstRoutinesNextPage
  );
  const totalPages = Math.ceil(routinesFiltered.length / routinesPerPage);

  return (
    <>
      <h1 className='border-b-8 border-t-8 px-8 py-2 text-center text-4xl font-bold'>
        ROUTINES
      </h1>
      <div className='flex w-full gap-2 px-20'>
        <SearchInput value={keyword} setValue={setKeyword} />
        {userData.username && (
          <Link
            to='/routines/create'
            className='border-2 border-primary-600 bg-primary-600 px-4 py-2 font-bold text-primary-100 hover:border-primary-700 hover:bg-primary-700'
          >
            Create New Routine
          </Link>
        )}
      </div>
      {totalPages >= 5 && (
        <Pagination
          totalPages={totalPages}
          setPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
      {/* {totalPages < 5 && (
        <Pagination3
          totalPages={totalPages}
          setPage={setCurrentPage}
          currentPage={currentPage}
        />
      )} */}
      <div className='flex w-full flex-col gap-6 px-20'>
        {routinesOfCurrentPage.map(routine => (
          <RoutineCard routine={routine} key={routine.id} route={route} />
        ))}
      </div>
    </>
  );
};

export default Routines;
