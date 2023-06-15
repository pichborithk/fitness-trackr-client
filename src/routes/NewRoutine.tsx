import { FormEvent, useEffect, useRef, useState } from 'react';
import { CheckInput, Input } from '../components';
import { NewRoutineData, RootContext } from '../types/types';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createRoutine } from '../lib/fetchRoutines';
import { toast } from 'react-hot-toast';

const NewRoutine = () => {
  const { token, userData, refreshData } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const publicRef = useRef<HTMLInputElement>(null);

  function handleSubmit(token: string, data: NewRoutineData) {
    return async function (event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const result = await createRoutine(token, data);
        console.log(result);

        if (result.error) {
          toast.error(result.message);
        }

        if (result.id) {
          await refreshData();
          toast.success('Successful create new routine');
          navigate('/routines');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setName('');
        setGoal('');
      }
    };
  }

  function handleCancel() {
    setName('');
    setGoal('');
    navigate('/routines');
  }

  useEffect(() => {
    if (!userData || !userData.id) {
      return navigate('/routines');
    }
  }, [userData]);

  return (
    <form
      onSubmit={handleSubmit(token, {
        name,
        goal,
        isPublic: publicRef.current?.checked || false,
      })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border px-20 py-12 text-xl text-primary-100 shadow-full_white'
    >
      <h1 className='text-4xl font-bold text-primary-500'>
        Create New Routine
      </h1>
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
        checked={false}
        name='is-public'
        label='Public ?'
        type='checkbox'
      />
      <div className='w-full'>
        <button className='mb-2 w-full rounded-lg border-2 border-primary-600 px-4 py-2 font-bold text-primary-500 hover:bg-primary-600 hover:text-white'>
          Create
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

export default NewRoutine;
