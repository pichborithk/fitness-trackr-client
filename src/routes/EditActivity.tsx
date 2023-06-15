import { useNavigate, useOutletContext } from 'react-router-dom';
import { NewActivityData, ViewActivityContext } from '../types/types';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../components';
import { updateActivity } from '../lib/fetchActivities';
import { toast } from 'react-hot-toast';

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
        if (result.error) {
          toast.error(result.message);
        }

        if (result.id) {
          await refreshData();
          toast.success('Successful updated activity');
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
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border px-20 py-12 text-xl text-primary-100 shadow-full_white'
    >
      <h1 className='text-4xl font-bold text-primary-500'>
        Edit Your Activity
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

export default EditActivity;
