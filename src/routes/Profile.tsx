import { Link, useOutletContext } from 'react-router-dom';
import { RootContext, Routine } from '../types/types';
import { useEffect, useState } from 'react';
import { fetchUserRoutines } from '../lib/fetchUsers';
import { RoutineCard } from '../components';

const Profile = () => {
  const { token, userData } = useOutletContext<RootContext>();
  const [routineList, setRoutineList] = useState<Routine[]>([]);

  async function getUserRoutines(token: string, username: string) {
    if (!userData.username || !userData.id || !token) {
      setRoutineList([]);
      return;
    }
    try {
      const result = await fetchUserRoutines(token, username);
      console.log(result);
      setRoutineList(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserRoutines(token, userData.username);
  }, [token, userData]);

  return (
    <>
      <h1 className='text-4xl font-bold'>Profile</h1>
      <div className='flex w-full flex-col gap-4 px-8'>
        <div className='flex w-full justify-between'>
          <Link
            to='/new-routine'
            className='bg-teal-500 px-4 py-2 font-bold text-white'
          >
            Add New Routine
          </Link>
          <Link
            to='/new-activity'
            className='bg-teal-500 px-4 py-2 font-bold text-white'
          >
            Add New Activity
          </Link>
        </div>
        <div className='flex flex-col gap-6'>
          {routineList.map(routine => (
            <RoutineCard routine={routine} key={routine.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
