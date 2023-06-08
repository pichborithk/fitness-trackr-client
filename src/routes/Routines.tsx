import { Link, useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { RoutineCard, SearchInput } from '../components';
import { useEffect, useState } from 'react';

const Routines = () => {
  const { publicRoutines, userData } = useOutletContext<RootContext>();
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

  return (
    <>
      <h1 className='text-4xl font-bold'>Routines</h1>
      <div className='flex w-full px-8'>
        <SearchInput value={keyword} setValue={setKeyword} />
        {userData.id && (
          <Link
            to='/routines/create'
            className='border-2 border-teal-500 px-4 py-2 font-bold text-teal-500 hover:bg-teal-500 hover:text-white'
          >
            Create New Routine
          </Link>
        )}
      </div>
      <div className='flex w-full flex-col gap-6 px-8'>
        {routinesFiltered.map(routine => (
          <RoutineCard routine={routine} key={routine.id} />
        ))}
      </div>
    </>
  );
};

export default Routines;
