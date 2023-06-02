import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { Routine } from '../components';

const Routines = () => {
  const { publicRoutines } = useOutletContext<RootContext>();
  return (
    <div>
      <h1>Routines</h1>
      <div>
        {publicRoutines.map(routine => (
          <Routine routine={routine} key={routine.id} />
        ))}
      </div>
    </div>
  );
};

export default Routines;
