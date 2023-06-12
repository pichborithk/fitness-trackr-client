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
      <h1 className='text-4xl font-bold'>Profile</h1>
      <div className='flex w-full flex-col gap-6 px-8'>
        {userRoutines.map(routine => (
          <RoutineCard routine={routine} key={routine.id} route={route} />
        ))}
      </div>
    </>
  );
};

export default Profile;
