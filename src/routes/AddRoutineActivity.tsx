import { FormEvent, useEffect, useState } from 'react';
import { Input, SelectInput } from '../components';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { NewRoutineActivityData, ViewRoutineContext } from '../types/types';
import { createRoutineActivity } from '../lib/fetchRoutines';
import { toast } from 'react-hot-toast';

const AddRoutineActivity = () => {
  const { isOwner, activities, routine, refreshData } =
    useOutletContext<ViewRoutineContext>();
  const navigate = useNavigate();

  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('');
  const [activityId, setActivityId] = useState('');

  function handleSubmit(id: number, data: NewRoutineActivityData) {
    return async function (event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        if (!data.activityId) {
          throw new Error('Must select activity');
        }
        const result = await createRoutineActivity(id, data);
        console.log(result);
        if (result.error) {
          toast.error(result.message);
        }

        if (result.id) {
          await refreshData();
          toast.success('Successful add activity to routine');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCount('');
        setDuration('');
        setActivityId('');
        navigate(`/routines/${routine.id}`);
      }
    };
  }

  function handleCancel() {
    setCount('');
    setDuration('');
    setActivityId('');
    navigate(`/routines/${routine.id}`);
  }

  useEffect(() => {
    if (!isOwner) {
      return navigate('/routines');
    }
  }, [routine]);

  return (
    <form
      onSubmit={handleSubmit(routine.id, {
        count: Number(count),
        duration: Number(duration),
        activityId: Number(activityId),
      })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border px-20 py-12 text-xl text-primary-100 shadow-full_white'
    >
      <h1 className='text-4xl font-bold text-primary-500'>
        Add Routine Activity
      </h1>
      <SelectInput
        activities={activities.sort()}
        setValue={setActivityId}
        routine={routine}
      />
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
          Add
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

export default AddRoutineActivity;
