import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { RoutineCard } from '../components';

const Profile = () => {
  const { userRoutines } = useOutletContext<RootContext>();

  return (
    <>
      <h1 className='text-4xl font-bold'>Profile</h1>
      <div className='flex w-full flex-col gap-6 px-8'>
        {userRoutines.map(routine => (
          <RoutineCard routine={routine} key={routine.id} />
        ))}
      </div>
    </>
  );
};

export default Profile;
