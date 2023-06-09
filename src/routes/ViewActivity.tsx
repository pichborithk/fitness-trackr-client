import { useEffect, useState } from 'react';
import { Activity, RootContext } from '../types/types';
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom';

const ViewActivity = () => {
  const { token, userData, refreshData, activities } =
    useOutletContext<RootContext>();
  const { activityId } = useParams();

  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const foundActivity = activities.find(
      activity => activity.id === Number(activityId)
    );
    if (foundActivity) {
      setActivity(foundActivity);
    }
  }, [activityId, activities]);

  if (!activity) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <h1 className='text-4xl font-bold text-teal-500'>{activity.name}</h1>
      <div className='flex w-full flex-col items-center gap-6 px-8'>
        <div className='flex w-full items-center justify-between rounded-2xl px-6 py-4 shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]'>
          <h4>Description: {activity.description}</h4>
          {userData.username && (
            <Link
              to={`/activities/${activityId}/edit`}
              className='rounded-md border-2 border-teal-500 px-2 py-1 text-sm text-teal-500 hover:bg-teal-500 hover:text-white'
            >
              Edit
            </Link>
          )}
        </div>
        <Outlet context={{ activity, refreshData, userData, token }} />
      </div>
    </>
  );
};

export default ViewActivity;
