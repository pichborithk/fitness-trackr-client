import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { RootContext, Routine } from '../types/types';
import { RoutineCard } from '../components';

const UserRoutines = () => {
  const { username } = useParams();
  const { publicRoutines, setRoute, route } = useOutletContext<RootContext>();

  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    const userRoutines = publicRoutines.filter(
      routine => routine.creatorName === username
    );

    setRoutines(userRoutines);
  }, [username, publicRoutines]);

  useEffect(() => {
    setRoute('profile');
  }, []);

  return (
    <>
      <h1 className='mb-4 border-b-8 border-t-8 px-8 py-2 text-center text-4xl font-bold'>
        {username}
      </h1>
      <div className='flex w-full flex-col gap-6 px-20'>
        {routines.map(routine => (
          <RoutineCard routine={routine} key={routine.id} route={route} />
        ))}
      </div>
    </>
  );
};

export default UserRoutines;
