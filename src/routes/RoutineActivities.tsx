import { useOutletContext } from 'react-router-dom';
import { Activity } from '../components';
import { ViewRoutineContext } from '../types/types';

const RoutineActivities = () => {
  const { routine } = useOutletContext<ViewRoutineContext>();
  return (
    <div className='grid grid-flow-row grid-cols-4 gap-4'>
      {routine.activities.map(activity => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default RoutineActivities;
