import { Activity } from '../types/types';

type Props = {
  activity: Activity & { count?: number; duration?: number };
};

const Activity = ({ activity }: Props) => {
  return (
    <>
      <h1 className='text-center text-xl font-black'>{activity.name}</h1>
      <p className='text-slate-700'>{activity.description}</p>
      {activity.count && <p>Count: {activity.count} reps</p>}
      {activity.duration && <p>Durations: {activity.duration} minutes</p>}
    </>
  );
};

export default Activity;
