import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../components';
import { createActivity } from '../lib/fetchActivities';
import { NewActivityData, RootContext } from '../types/types';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
        if (result.error) {
          toast.error(result.message);
        }

        if (result.id) {
          await refreshData();
          toast.success('Successful create new activity');
          navigate('/activities');
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
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border px-20 py-12 text-xl text-primary-100 shadow-full_white'
    >
      <h1 className='text-4xl font-bold text-primary-500'>
        Create New Activity
      </h1>
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

export default NewActivity;
