import { Link, useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { Activity, SearchInput } from '../components';
import { useEffect, useState } from 'react';

const Activities = () => {
  const { activities, userData } = useOutletContext<RootContext>();
  const [keyword, setKeyword] = useState('');
  const [activitiesFiltered, setActivitiesFiltered] = useState(activities);

  useEffect(() => {
    if (!activities) return;
    const filteredActivities = activities.filter(
      activity =>
        activity.name.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
        keyword === ''
    );

    setActivitiesFiltered(filteredActivities);
  }, [keyword, activities]);

  return (
    <>
      <h1 className='text-4xl font-bold'>Activities</h1>
      <div className='flex w-full'>
        <SearchInput value={keyword} setValue={setKeyword} />
        {userData.id && (
          <Link
            to='/activities/create'
            className='border-2 border-teal-500 px-4 py-2 font-bold text-teal-500 hover:bg-teal-500 hover:text-white'
          >
            Create New Activity
          </Link>
        )}
      </div>
      <div className='grid grid-flow-row grid-cols-4 gap-4'>
        {activitiesFiltered.map(activity => (
          <Activity key={activity.id} activity={activity} />
        ))}
      </div>
    </>
  );
};

export default Activities;
