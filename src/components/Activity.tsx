import { Link } from 'react-router-dom';
import { Activity } from '../types/types';
import { deleteRoutineActivity } from '../lib/fetchRoutines';
import { toast } from 'react-hot-toast';

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
      if (!result?.success) {
        toast.error('Fail to delete activity from routine');
      }

      if (result?.success) {
        await refreshData();
        toast.success('Successful deleted activity from routine');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex max-h-96 flex-col justify-between border-[16px] border-primary-100 p-4'>
      <div>
        <p className='text-center text-xl font-black text-primary-500'>
          <Link to={`/activities/${activity.id}`} className='hover:border-b-2'>
            {activity.name}
          </Link>
        </p>
        <p className='font-lora text-slate-400'>{activity.description}</p>
        {activity.count && (
          <p className='font-lora text-slate-400'>
            Count: {activity.count} reps
          </p>
        )}
        {activity.duration && (
          <p className='font-lora text-slate-400'>
            Durations: {activity.duration} minutes
          </p>
        )}
      </div>
      {route === 'routines' && isOwner && (
        <div className='mt-2 text-center'>
          <Link
            to={`/routines/${activity.routineId}/${activity.routineActivityId}`}
            className='rounded-md border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-600 hover:text-white'
          >
            EDIT
          </Link>
          <button
            onClick={() => handleDelete(activity.routineActivityId!, token)}
            type='button'
            className='ml-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-primary-100 hover:bg-red-800'
          >
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export default Activity;
