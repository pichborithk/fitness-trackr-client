import { RoutineActivity } from '../types/types';

type Props = {
  activity: RoutineActivity;
};

const RoutineActivity = ({ activity }: Props) => {
  return (
    <div>
      <h3 className='text-xl font-bold'>{activity.name}</h3>
      {/* <p>Description: {activity.description}</p> */}
      <p>Count: {activity.description} reps</p>
      <p>Durations: {activity.duration} minutes</p>
    </div>
  );
};
export default RoutineActivity;
