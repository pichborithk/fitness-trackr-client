import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { NewRoutineData, ViewRoutineContext } from '../types/types';
import { CheckInput, Input } from '../components';
import { updateRoutine } from '../lib/fetchRoutines';
import { toast } from 'react-hot-toast';

const EditRoutine = () => {
  const { routine, token, isOwner, refreshData } =
    useOutletContext<ViewRoutineContext>();
  const navigate = useNavigate();

  const [name, setName] = useState(routine.name);
  const [goal, setGoal] = useState(routine.goal);
  const publicRef = useRef<HTMLInputElement>(null);

  function handleSubmit(id: number, token: string, data: NewRoutineData) {
    return async function (event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const result = await updateRoutine(id, token, data);
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
        setName('');
        setGoal('');
        navigate(`/routines/${routine.id}`);
      }
    };
  }

  function handleCancel() {
    setName('');
    setGoal('');
    navigate(`/routines/${routine.id}`);
  }

  useEffect(() => {
    if (!isOwner) {
      return navigate('/routines');
    }
  }, [routine]);

  return (
    <form
      onSubmit={handleSubmit(routine.id, token, {
        name,
        goal,
        isPublic: publicRef.current?.checked || false,
      })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border px-20 py-12 text-xl text-primary-100 shadow-full_white'
    >
      <h1 className='text-4xl font-bold text-primary-500'>Edit Your Routine</h1>
      <Input
        value={name}
        setValue={setName}
        name='routine-name'
        type='text'
        required={true}
        label='Name*'
      />
      <Input
        value={goal}
        setValue={setGoal}
        name='routine-goal'
        type='text'
        required={true}
        label='Goal*'
      />
      <CheckInput
        reference={publicRef}
        checked={routine.isPublic}
        name='is-public'
        label='Public ?'
        type='checkbox'
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

export default EditRoutine;
