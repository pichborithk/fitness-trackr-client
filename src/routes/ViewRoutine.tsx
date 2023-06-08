import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom';
import { RootContext, Routine } from '../types/types';
import { useEffect, useState } from 'react';

const ViewRoutine = () => {
  const { userRoutines, publicRoutines } = useOutletContext<RootContext>();
  const [routine, setRoutine] = useState<Routine | null>(null);

  const { routineId } = useParams();

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

  return (
    <>
      <h1 className='text-4xl font-bold text-teal-500'>{routine.name}</h1>
      <div className='flex w-full flex-col gap-6 px-8'>
        <div className='w-full rounded-2xl shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]'>
          <div className='flex justify-between px-6 py-4'>
            <div>
              <h4>{routine.goal}</h4>
              <p className='text-sm text-slate-700'>Create By:</p>
              <p className='text-2xl font-bold'>{routine.creatorName}</p>
            </div>
            <div className='flex flex-col items-end justify-between'>
              <p>Delete</p>
              <div>
                <Link to={`/routines/${routineId}/add_activities`}>
                  Add Activities
                </Link>
                <Link to={`/routines/${routineId}/edit`}>Edit</Link>
              </div>
            </div>
          </div>
        </div>
        <Outlet context={{ routine }} />
      </div>
    </>
  );
};

export default ViewRoutine;
