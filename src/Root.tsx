import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Footer, Navbar, ScrollToTop } from './components';
import { useEffect, useState } from 'react';
import { Activity, Routine, UserData } from './types/types';
import { fetchUserData, fetchUserRoutines } from './lib/fetchUsers';
import { fetchPublicRoutines } from './lib/fetchRoutines';
import { fetchActivities } from './lib/fetchActivities';

const initialToken: string = localStorage.getItem('TOKEN') || '';

const Root = () => {
  const [token, setToken] = useState(initialToken);
  const [route, setRoute] = useState('home');
  const [userData, setUserData] = useState<UserData>({ id: 0, username: '' });
  const [publicRoutines, setPublicRoutines] = useState<Routine[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [userRoutines, setUserRoutines] = useState<Routine[]>([]);

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

  async function getUserRoutines(token: string, username: string) {
    if (!userData.username || !userData.id || !token) {
      setUserRoutines([]);
      return;
    }
    try {
      const result = await fetchUserRoutines(token, username);
      // console.log(result);
      setUserRoutines(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshData() {
    await getActivities();
    await getPublicRoutines();
    await getUserRoutines(token, userData.username);
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

  useEffect(() => {
    getUserRoutines(token, userData.username);
  }, [token, userData]);

  return (
    <>
      <ScrollToTop />
      <Toaster position='bottom-center' />
      <Navbar
        route={route}
        userData={userData}
        setRoute={setRoute}
        setToken={setToken}
        setUserData={setUserData}
      />
      <div className='mx-auto mb-8 flex min-h-screen max-w-7xl flex-col items-center gap-4 px-2'>
        <Outlet
          context={{
            token,
            publicRoutines,
            activities,
            setToken,
            setRoute,
            userData,
            userRoutines,
            refreshData,
            route,
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Root;
