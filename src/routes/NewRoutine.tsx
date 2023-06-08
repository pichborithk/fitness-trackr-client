import { FormEvent, useEffect, useRef, useState } from 'react';
import { CheckInput, Input } from '../components';
import { NewRoutineData, RootContext } from '../types/types';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createRoutine } from '../lib/fetchRoutines';

const NewRoutine = () => {
  const { token, userData } = useOutletContext<RootContext>();
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
      } catch (error) {
        console.error(error);
      } finally {
        setName('');
        setGoal('');
        publicRef.current!.checked = false;
      }
    };
  }

  function handleCancel() {
    setName('');
    setGoal('');
    navigate('/routines');
  }

  useEffect(() => {
    if (!userData || !userData.id) return navigate('/routines');
  }, [userData]);

  return (
    <form
      onSubmit={handleSubmit(token, {
        name,
        goal,
        isPublic: publicRef.current?.checked || false,
      })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border border-teal-500 px-20 py-12 text-xl text-slate-500'
    >
      <h1 className='text-4xl font-bold text-teal-500'>Create New Routine</h1>
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
        <button className='mb-2 w-full rounded-lg border-2 border-teal-500 px-4 py-2 font-bold text-teal-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white'>
          Create
        </button>
        <button
          type='button'
          onClick={() => handleCancel()}
          className='mb-2 w-full rounded-lg border-2 border-black px-4 py-2 font-bold text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewRoutine;
