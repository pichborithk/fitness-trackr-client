import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { RoutineCard } from '../components';
import { useEffect } from 'react';

const Profile = () => {
  const { userRoutines, setRoute, route } = useOutletContext<RootContext>();

  useEffect(() => {
    setRoute('profile');
  }, []);

  return (
    <>
      <h1 className='mb-4 border-b-8 border-t-8 px-8 py-2 text-center text-4xl font-bold'>
        PROFILE
      </h1>
      <div className='flex w-full flex-col gap-6 px-20'>
        {userRoutines.map(routine => (
          <RoutineCard routine={routine} key={routine.id} route={route} />
        ))}
      </div>
    </>
  );
};

export default Profile;
