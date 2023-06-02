import { RoutineActivity } from '../types/types';

type Props = {
  activity: RoutineActivity;
};

const RoutineActivity = ({ activity }: Props) => {
  return (
    <>
      <h3>{activity.name}</h3>
      <p>Description: {activity.description}</p>
      <p>Count: {activity.description} reps</p>
      <p>Durations: {activity.duration} minutes</p>
    </>
  );
};
export default RoutineActivity;
