import { Link, useOutletContext } from 'react-router-dom';
import { Activity } from '../components';
import { ViewRoutineContext } from '../types/types';
import { deleteRoutineActivity } from '../lib/fetchRoutines';

const RoutineActivities = () => {
  const { routine, isOwner, refreshData, token } =
    useOutletContext<ViewRoutineContext>();

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
    <div className='grid grid-flow-row grid-cols-3 gap-4'>
      {routine.activities.map(activity => (
        <div
          key={activity.id}
          className='max-h-96 border-[16px] border-teal-500 p-4 shadow-[8px_8px_0_0_rgb(0,0,0,1)]'
        >
          <Activity activity={activity} />
          {isOwner && (
            <div className='text-center'>
              <Link
                to={`/routines/${routine.id}/${activity.routineActivityId}`}
                className='mr-2 rounded-md border-2 border-teal-500 px-2 py-1 text-sm text-teal-500 hover:bg-teal-500 hover:text-white'
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(activity.routineActivityId, token)}
                type='button'
                className='rounded-md border-2 border-black px-2 py-1 text-sm hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black'
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoutineActivities;
