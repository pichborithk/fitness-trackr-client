import { Outlet } from 'react-router-dom';
import { Navbar } from './components';
import { useState } from 'react';

const initialToken: string = localStorage.getItem('TOKEN') || '';

const Root = () => {
  const [token, setToken] = useState(initialToken);
  const [route, setRoute] = useState('home');

  return (
    <>
      <Navbar
        route={route}
        token={token}
        setRoute={setRoute}
        setToken={setToken}
      />
      <div className='max-w-7xl mx-auto flex flex-col items-center min-h-screen'>
        <Outlet context={{ token, setToken, setRoute }} />
      </div>
    </>
  );
};

export default Root;
