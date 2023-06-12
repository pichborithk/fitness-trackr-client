import { useEffect, useState } from 'react';
import { Activity, RootContext } from '../types/types';
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom';

const ViewActivity = () => {
  const { token, userData, refreshData, activities, route, setRoute } =
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

  useEffect(() => {
    setRoute('activities');
  }, []);

  if (!activity) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <h1 className='mb-4 border-b-8 border-t-8 px-8 py-2 text-center text-4xl font-bold'>
        {activity.name}
      </h1>
      <div className='flex w-full flex-col items-center gap-6 px-20'>
        <div className='flex w-full items-center justify-between rounded-2xl px-6 py-4 shadow-full_white'>
          <h4>Description: {activity.description}</h4>
          {userData.username && (
            <Link
              to={`/activities/${activityId}/edit`}
              className='rounded-md border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-600 hover:text-white'
            >
              EDIT
            </Link>
          )}
        </div>
        <Outlet context={{ activity, refreshData, userData, token, route }} />
      </div>
    </>
  );
};

export default ViewActivity;
