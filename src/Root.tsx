import { Outlet } from 'react-router-dom';
import { Navbar } from './components';
import { useEffect, useState } from 'react';
import { Activity, Routine, UserData } from './types/types';
import { fetchUserData } from './lib/fetchUsers';
import { fetchPublicRoutines } from './lib/fetchRoutines';
import { fetchActivities } from './lib/fetchActivities';

const initialToken: string = localStorage.getItem('TOKEN') || '';

const Root = () => {
  const [token, setToken] = useState(initialToken);
  const [route, setRoute] = useState('home');
  const [userData, setUserData] = useState<UserData>({ id: 0, username: '' });
  const [publicRoutines, setPublicRoutines] = useState<Routine[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  async function getUserData(token: string) {
    try {
      const result = await fetchUserData(token);
      setUserData(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPublicRoutines() {
    try {
      const result = await fetchPublicRoutines();
      setPublicRoutines(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function getActivities() {
    try {
      const result = await fetchActivities();
      setActivities(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async function () {
      await getPublicRoutines();
      await getActivities();
    })();
  }, []);

  useEffect(() => {
    if (token) {
      getUserData(token);
    }
  }, [token]);

  return (
    <>
      <Navbar
        route={route}
        userData={userData}
        setRoute={setRoute}
        setToken={setToken}
        setUserData={setUserData}
      />
      <div className='flex min-h-screen flex-col items-center gap-4'>
        <Outlet
          context={{
            token,
            publicRoutines,
            activities,
            setToken,
            setRoute,
            userData,
          }}
        />
      </div>
    </>
  );
};

export default Root;
