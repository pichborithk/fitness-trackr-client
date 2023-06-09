import {
  Link,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { RootContext, Routine } from '../types/types';
import { useEffect, useState } from 'react';
import { deleteRoutine } from '../lib/fetchRoutines';

const ViewRoutine = () => {
  const { userRoutines, publicRoutines, token, userData, refreshData } =
    useOutletContext<RootContext>();
  const [routine, setRoutine] = useState<Routine | null>(null);

  const { routineId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundRoutine =
      publicRoutines.find(r => r.id === Number(routineId)) ||
      userRoutines.find(r => r.id === Number(routineId));
    if (foundRoutine) {
      setRoutine(foundRoutine);
    }
  }, [publicRoutines, routineId, userRoutines]);

  if (!routine) {
    return <div>Not Found</div>;
  }

  async function handleDelete(id: number, token: string) {
    try {
      const result = await deleteRoutine(id, token);
      console.log(result);
      if (result?.success) {
        navigate('/routines');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className='text-4xl font-bold text-teal-500'>{routine.name}</h1>
      <div className='flex w-full flex-col items-center gap-6 px-8'>
        <div className='w-full rounded-2xl shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]'>
          <div className='flex justify-between px-6 py-4'>
            <div>
              <h4>{routine.goal}</h4>
              <p className='text-sm text-slate-700'>Create By:</p>
              <p className='text-2xl font-bold'>{routine.creatorName}</p>
            </div>
            {routine.creatorId === userData.id && (
              <div className='flex flex-col items-end justify-between'>
                <button
                  onClick={() => handleDelete(Number(routineId), token)}
                  type='button'
                  className='rounded-md border-2 border-black px-2 py-1 text-sm hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black'
                >
                  Delete
                </button>
                <div>
                  <Link
                    to={`/routines/${routineId}/edit`}
                    className='rounded-md border-2 border-teal-500 px-2 py-1 text-sm text-teal-500 hover:bg-teal-500 hover:text-white'
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/routines/${routineId}/add_activities`}
                    className='ml-2 rounded-md border-2 border-teal-500 px-2 py-1 text-sm text-teal-500 hover:bg-teal-500 hover:text-white'
                  >
                    Add Activities
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <Outlet context={{ routine, token, userData, refreshData }} />
      </div>
    </>
  );
};

export default ViewRoutine;
