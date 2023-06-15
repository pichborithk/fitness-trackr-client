import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import {
  NewRoutineActivityData,
  RoutineActivity,
  ViewRoutineContext,
} from '../types/types';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../components';
import { updateRoutineActivity } from '../lib/fetchRoutines';
import { toast } from 'react-hot-toast';

const EditRoutineActivity = () => {
  const { routine, token, isOwner, refreshData } =
    useOutletContext<ViewRoutineContext>();
  const { routineActivityId } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<RoutineActivity | null>(null);
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const foundActivity = routine.activities.find(
      activity => activity.routineActivityId === Number(routineActivityId)
    );
    if (foundActivity) {
      setActivity(foundActivity);
      setCount(foundActivity.count.toString());
      setDuration(foundActivity.duration.toString());
    }
  }, [routine, routineActivityId]);

  useEffect(() => {
    if (!isOwner) {
      return navigate('/routines');
    }
  }, [routine]);

  if (!activity) {
    return <div>Not Found</div>;
  }

  function handleSubmit(
    id: number,
    token: string,
    data: NewRoutineActivityData
  ) {
    return async function (event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const result = await updateRoutineActivity(id, token, data);
        console.log(result);
        if (result.error) {
          toast.error(result.message);
        }

        if (result.id) {
          await refreshData();
          toast.success('Successful updated routine');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCount('');
        setDuration('');
        navigate(`/routines/${routine.id}`);
      }
    };
  }

  function handleCancel() {
    setCount('');
    setDuration('');
    navigate(`/routines/${routine.id}`);
  }

  return (
    <form
      onSubmit={handleSubmit(Number(routineActivityId), token, {
        count: Number(count),
        duration: Number(duration),
      })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border px-20 py-12 text-xl text-primary-100 shadow-full_white'
    >
      <h1 className='text-4xl font-bold text-primary-500'>{activity.name}</h1>
      <Input
        value={count}
        setValue={setCount}
        name='routine-activity-count'
        type='text'
        required={true}
        label='Count*'
      />
      <Input
        value={duration}
        setValue={setDuration}
        name='routine-activity-duration'
        type='text'
        required={true}
        label='Duration*'
      />
      <div className='w-full'>
        <button className='mb-2 w-full rounded-lg border-2 border-primary-600 px-4 py-2 font-bold text-primary-500 hover:bg-primary-600 hover:text-white'>
          Save
        </button>
        <button
          type='button'
          onClick={() => handleCancel()}
          className='mb-2 w-full rounded-lg border-2 border-primary-100 px-4 py-2 font-bold text-primary-100 hover:bg-primary-100 hover:text-primary-600'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRoutineActivity;
