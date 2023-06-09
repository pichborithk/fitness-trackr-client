import { useNavigate, useOutletContext } from 'react-router-dom';
import { NewActivityData, ViewActivityContext } from '../types/types';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../components';
import { updateActivity } from '../lib/fetchActivities';

const EditActivity = () => {
  const { activity, refreshData, userData, token } =
    useOutletContext<ViewActivityContext>();
  const navigate = useNavigate();

  const [name, setName] = useState(activity.name);
  const [description, setDescription] = useState(activity.description);

  function handleSubmit(id: number, token: string, data: NewActivityData) {
    return async function (event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const result = await updateActivity(id, token, data);
        console.log(result);
        if (result.id) {
          await refreshData();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setName('');
        setDescription('');
        navigate(`/activities/${activity.id}`);
      }
    };
  }

  function handleCancel() {
    setName('');
    setDescription('');
    navigate(`/activities/${activity.id}`);
  }

  useEffect(() => {
    if (!userData || !userData.id)
      return navigate(`/activities/${activity.id}`);
  }, [userData]);

  return (
    <form
      onSubmit={handleSubmit(activity.id, token, {
        name,
        description,
      })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border border-teal-500 px-20 py-12 text-xl text-slate-500'
    >
      <h1 className='text-4xl font-bold text-teal-500'>Edit Your Activity</h1>
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
          Save
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

export default EditActivity;
