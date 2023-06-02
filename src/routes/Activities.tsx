import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { Activity } from '../components';

const Activities = () => {
  const { activities } = useOutletContext<RootContext>();

  return (
    <div>
      <h1>Activities</h1>
      <div>
        {activities.map(activity => (
          <Activity key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Activities;
