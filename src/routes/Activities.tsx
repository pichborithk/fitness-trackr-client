import { Link, useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { Activity, SearchInput } from '../components';
import { useEffect, useState } from 'react';

const Activities = () => {
  const { activities, userData, refreshData, token, setRoute } =
    useOutletContext<RootContext>();
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

  useEffect(() => {
    setRoute('activities');
  }, []);

  return (
    <>
      <h1 className='border-b-8 border-t-8 px-8 py-2 text-center text-4xl font-bold'>
        ACTIVITIES
      </h1>
      <div className='flex w-full gap-2 px-20'>
        <SearchInput value={keyword} setValue={setKeyword} />
        {userData.username && (
          <Link
            to='/activities/create'
            className='border-2 border-primary-600 bg-primary-600 px-4 py-2 font-bold text-primary-100 hover:border-primary-700 hover:bg-primary-700'
          >
            Create New Activity
          </Link>
        )}
      </div>
      <div className='grid grid-flow-row grid-cols-4 gap-4 px-20'>
        {activitiesFiltered.map(activity => (
          <Activity
            activity={activity}
            route='activities'
            refreshData={refreshData}
            token={token}
            key={activity.id}
          />
        ))}
      </div>
    </>
  );
};

export default Activities;
