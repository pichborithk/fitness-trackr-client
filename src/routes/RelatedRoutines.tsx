import { useOutletContext } from 'react-router-dom';
import { Routine, ViewActivityContext } from '../types/types';
import { useEffect, useState } from 'react';
import { fetchRoutinesByActivity } from '../lib/fetchRoutines';
import { RoutineCard } from '../components';

const RelatedRoutines = () => {
  const { activity, route } = useOutletContext<ViewActivityContext>();
  const [routines, setRoutines] = useState<Routine[]>([]);

  async function getRelatedRoutines(id: number) {
    try {
      const result = await fetchRoutinesByActivity(id);
      setRoutines(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRelatedRoutines(activity.id);
  }, [activity]);

  return (
    <>
      <h1 className='text-4xl font-bold'>Routines</h1>
      <div className='flex w-full flex-col gap-6'>
        {routines.map(routine => (
          <RoutineCard routine={routine} key={routine.id} route={route} />
        ))}
      </div>
    </>
  );
};

export default RelatedRoutines;
