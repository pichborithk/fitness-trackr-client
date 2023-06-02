import { Outlet } from 'react-router-dom';
import { Navbar } from './components';
import { useEffect, useState } from 'react';
import { UserData } from './types/types';
import { fetchUserData } from './lib/fetchUsers';

const initialToken: string = localStorage.getItem('TOKEN') || '';

const Root = () => {
  const [token, setToken] = useState(initialToken);
  const [route, setRoute] = useState('home');
  const [userData, setUserData] = useState<UserData>({ id: 0, username: '' });

  async function getUserData(token: string) {
    try {
      const result = await fetchUserData(token);
      setUserData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (token) {
      getUserData(token);
    }
  }, [token]);

  return (
    <>
      <Navbar
        route={route}
        token={token}
        setRoute={setRoute}
        setToken={setToken}
      />
      <div className='mx-auto flex min-h-screen max-w-7xl flex-col items-center'>
        <Outlet context={{ token, setToken, setRoute }} />
      </div>
    </>
  );
};

export default Root;
