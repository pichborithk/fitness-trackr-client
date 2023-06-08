import { Activity } from '../types/types';

type Props = {
  activity: Activity & { count?: number; duration?: number };
};

const Activity = ({ activity }: Props) => {
  return (
    <div className='max-h-96 border-[16px] border-teal-500 p-4 shadow-[8px_8px_0_0_rgb(0,0,0,1)]'>
      <h1 className='text-center text-xl font-black'>{activity.name}</h1>
      <p className='text-slate-700'>{activity.description}</p>
      {activity.count && <p>Count: {activity.description} reps</p>}
      {activity.duration && <p>Durations: {activity.duration} minutes</p>}
    </div>
  );
};

export default Activity;
