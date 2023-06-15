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
import { toast } from 'react-hot-toast';

const ViewRoutine = () => {
  const {
    userRoutines,
    publicRoutines,
    token,
    userData,
    refreshData,
    activities,
    setRoute,
  } = useOutletContext<RootContext>();
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

  useEffect(() => {
    setRoute('routines');
  }, []);

  if (!routine) {
    return <div>Not Found</div>;
  }

  async function handleDelete(id: number, token: string) {
    try {
      const result = await deleteRoutine(id, token);
      console.log(result);
      if (result?.success) {
        await refreshData();
        toast.success('Successful deleted routine');
        navigate('/routines');
      }

      if (!result?.success) {
        toast.error('Fail to delete routine');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className='mb-4 border-b-8 border-t-8 px-8 py-2 text-center text-4xl font-bold'>
        {routine.name}
      </h1>
      <div className='flex w-full flex-col items-center gap-6 px-20'>
        <div className='w-full rounded-2xl shadow-full_white'>
          <div className='flex justify-between px-6 py-4'>
            <div>
              <h4 className='font-lora text-primary-100'>{routine.goal}</h4>
              <p className='font-lora text-sm text-slate-400'>Create By:</p>
              <Link
                to={`/${routine.creatorName}`}
                className='text-2xl font-bold text-primary-500 hover:border-b-2'
              >
                {routine.creatorName}
              </Link>
            </div>
            {routine.creatorId === userData.id && (
              <div className='flex flex-col items-end justify-between'>
                <div>
                  <Link
                    to={`/routines/${routineId}/edit`}
                    className='rounded-md border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-600 hover:text-white'
                  >
                    EDIT
                  </Link>
                  <Link
                    to={`/routines/${routineId}/add_activity`}
                    className='ml-2 rounded-md border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-600 hover:text-white'
                  >
                    ADD ACTIVITY
                  </Link>
                </div>
                <button
                  onClick={() => handleDelete(Number(routineId), token)}
                  type='button'
                  className='rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-primary-100 hover:bg-red-800'
                >
                  DELETE
                </button>
              </div>
            )}
          </div>
        </div>
        <Outlet
          context={{
            routine,
            token,
            refreshData,
            activities,
            isOwner: routine.creatorId === userData.id,
          }}
        />
      </div>
    </>
  );
};

export default ViewRoutine;
