import { Link, useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { RoutineCard, SearchInput } from '../components';
import { useEffect, useState } from 'react';

const Routines = () => {
  const { publicRoutines, userData, setRoute, route } =
    useOutletContext<RootContext>();
  const [keyword, setKeyword] = useState('');
  const [routinesFiltered, setRoutinesFiltered] = useState(publicRoutines);

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

  return (
    <>
      <h1 className='border-b-8 border-t-8 px-8 py-2 text-center text-4xl font-bold'>
        ROUTINES
      </h1>
      <div className='flex w-full gap-2 px-20'>
        <SearchInput value={keyword} setValue={setKeyword} />
        {userData.id && (
          <Link
            to='/routines/create'
            className='border-2 border-primary-600 bg-primary-600 px-4 py-2 font-bold text-primary-100 hover:border-primary-700 hover:bg-primary-700'
          >
            Create New Routine
          </Link>
        )}
      </div>
      <div className='flex w-full flex-col gap-6 px-20'>
        {routinesFiltered.map(routine => (
          <RoutineCard routine={routine} key={routine.id} route={route} />
        ))}
      </div>
    </>
  );
};

export default Routines;
