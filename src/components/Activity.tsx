import { Link } from 'react-router-dom';
import { Activity } from '../types/types';
import { deleteRoutineActivity } from '../lib/fetchRoutines';

type Props = {
  token: string;
  refreshData: () => Promise<void>;
  activity: Activity & {
    count?: number;
    duration?: number;
    routineId?: number;
    routineActivityId?: number;
  };
  route: string;
  isOwner?: boolean;
};

const Activity = ({ activity, isOwner, route, refreshData, token }: Props) => {
  async function handleDelete(id: number, token: string) {
    try {
      const result = await deleteRoutineActivity(id, token);
      console.log(result);
      if (result?.success) {
        await refreshData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='max-h-96 border-[16px] border-teal-500 p-4 shadow-[8px_8px_0_0_rgb(0,0,0,1)]'>
      <Link
        to={`/activities/${activity.id}`}
        className='block text-center text-xl font-black'
      >
        {activity.name}
      </Link>
      <p className='text-slate-700'>{activity.description}</p>
      {activity.count && <p>Count: {activity.count} reps</p>}
      {activity.duration && <p>Durations: {activity.duration} minutes</p>}
      {route === 'routines' && isOwner && (
        <div className='text-center'>
          <Link
            to={`/routines/${activity.routineId}/${activity.routineActivityId}`}
            className='mr-2 rounded-md border-2 border-teal-500 px-2 py-1 text-sm text-teal-500 hover:bg-teal-500 hover:text-white'
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(activity.routineActivityId!, token)}
            type='button'
            className='rounded-md border-2 border-black px-2 py-1 text-sm hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black'
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Activity;
