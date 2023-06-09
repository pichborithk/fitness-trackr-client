import { useOutletContext } from 'react-router-dom';
import { Activity } from '../components';
import { ViewRoutineContext } from '../types/types';

const RoutineActivities = () => {
  const { routine, isOwner, refreshData, token } =
    useOutletContext<ViewRoutineContext>();

  return (
    <div className='grid grid-flow-row grid-cols-3 gap-4'>
      {routine.activities.map(activity => (
        <Activity
          activity={activity}
          isOwner={isOwner}
          route='routines'
          key={activity.id}
          token={token}
          refreshData={refreshData}
        />
      ))}
    </div>
  );
};

export default RoutineActivities;
