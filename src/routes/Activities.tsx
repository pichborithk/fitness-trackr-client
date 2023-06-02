import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { Activity } from '../components';

const Activities = () => {
  const { activities } = useOutletContext<RootContext>();

  return (
    <>
      <h1 className='text-4xl'>Activities</h1>
      <div className='grid grid-flow-row grid-cols-4 gap-4'>
        {activities.map(activity => (
          <Activity key={activity.id} activity={activity} />
        ))}
      </div>
    </>
  );
};

export default Activities;
