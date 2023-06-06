import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { Routine } from '../components';

const Routines = () => {
  const { publicRoutines } = useOutletContext<RootContext>();
  return (
    <>
      <h1 className='text-4xl'>Routines</h1>
      <div className='flex flex-col gap-6'>
        {publicRoutines.map(routine => (
          <Routine routine={routine} key={routine.id} />
        ))}
      </div>
    </>
  );
};

export default Routines;
