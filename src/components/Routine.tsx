import { RoutineActivity } from '.';
import { Routine } from '../types/types';

type Props = {
  routine: Routine;
};

const Routine = ({ routine }: Props) => {
  return (
    <div>
      <div>
        <h3>{routine.name}</h3>
        <h4>{routine.goal}</h4>
        <p>{routine.creatorName}</p>
      </div>
      <div>
        {routine.activities.map(activity => (
          <RoutineActivity activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
};

export default Routine;
