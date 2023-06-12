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
      <h1 className='text-4xl font-bold text-teal-500'>{username}</h1>
      <div className='flex w-full flex-col gap-6 px-8'>
        {routines.map(routine => (
          <RoutineCard routine={routine} key={routine.id} route={route} />
        ))}
      </div>
    </>
  );
};

export default UserRoutines;
