import { RoutineActivity } from '../types/types';

type Props = {
  activity: RoutineActivity;
};

const RoutineActivity = ({ activity }: Props) => {
  return (
    <div>
      <h3 className='text-xl font-bold text-primary-100'>{activity.name}</h3>
      <p className='font-lora text-slate-400'>
        Count: {activity.description} reps
      </p>
      <p className='font-lora text-slate-400'>
        Durations: {activity.duration} minutes
      </p>
    </div>
  );
};
export default RoutineActivity;
