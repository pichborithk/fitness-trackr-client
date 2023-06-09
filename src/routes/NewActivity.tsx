import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../components';
import { createActivity } from '../lib/fetchActivities';
import { NewActivityData, RootContext } from '../types/types';
import { useNavigate, useOutletContext } from 'react-router-dom';

const NewActivity = () => {
  const { token, userData, refreshData } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(token: string, data: NewActivityData) {
    return async function (event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const result = await createActivity(token, data);
        console.log(result);
        if (result.id) {
          await refreshData();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setName('');
        setDescription('');
      }
    };
  }

  function handleCancel() {
    setName('');
    setDescription('');
    navigate('/activities');
  }

  useEffect(() => {
    if (!userData || !userData.id) return navigate('/activities');
  }, [userData]);

  return (
    <form
      onSubmit={handleSubmit(token, { name, description })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border border-teal-500 px-20 py-12 text-xl text-slate-500'
    >
      <h1 className='text-4xl font-bold text-teal-500'>Create New Activity</h1>
      <Input
        value={name}
        setValue={setName}
        name='activity-name'
        type='text'
        required={true}
        label='Name*'
      />
      <Input
        value={description}
        setValue={setDescription}
        name='activity-description'
        type='text'
        required={true}
        label='Description*'
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

export default NewActivity;
