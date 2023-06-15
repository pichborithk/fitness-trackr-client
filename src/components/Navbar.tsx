import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../types/types';
import logo from '../assets/logo.png';
import { toast } from 'react-hot-toast';

type Props = {
  userData: UserData;
  route: string;
  setRoute: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
  setUserData: Dispatch<SetStateAction<UserData>>;
};

const Navbar = ({
  userData,
  route,
  setRoute,
  setToken,
  setUserData,
}: Props) => {
  function handleSignOut() {
    localStorage.clear();
    setRoute('home');
    setToken('');
    setUserData({ id: 0, username: '' });
    toast.success('Logged Out');
  }

  return (
    <nav className='text-2xl font-bold'>
      <div className='mx-auto mb-4 flex max-w-7xl items-center justify-between px-2'>
        <img src={logo} alt='logo' className='max-h-20' />
        <div className='flex justify-between gap-2'>
          <Link
            to='/'
            onClick={() => setRoute('home')}
            className={`border-primary-500 px-4 py-2  hover:border-b-4 ${
              route === 'home' ? 'border-b-4 uppercase text-primary-500' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to='/pricing'
            onClick={() => setRoute('pricing')}
            className={`border-primary-500 px-4 py-2 hover:border-b-4 ${
              route === 'pricing' ? 'border-b-4 uppercase text-primary-500' : ''
            }`}
          >
            Pricing
          </Link>
          <Link
            to='/routines'
            onClick={() => setRoute('routines')}
            className={`border-primary-500 px-4 py-2 hover:border-b-4 ${
              route === 'routines'
                ? 'border-b-4 uppercase text-primary-500'
                : ''
            }`}
          >
            Routines
          </Link>
          <Link
            to='/activities'
            onClick={() => setRoute('activities')}
            className={`border-primary-500 px-4 py-2 hover:border-b-4 ${
              route === 'activities'
                ? 'border-b-4 uppercase text-primary-500'
                : ''
            }`}
          >
            Activities
          </Link>
          {userData.username && (
            <Link
              to='/profile'
              onClick={() => setRoute('profile')}
              className={`border-primary-500 px-4 py-2 hover:border-b-4 ${
                route === 'profile'
                  ? 'border-b-4 uppercase text-primary-500'
                  : ''
              }`}
            >
              Profile
            </Link>
          )}
        </div>
        {userData.username && (
          <Link
            to='/'
            onClick={handleSignOut}
            className='rounded-md border-2 border-primary-100 bg-primary-100 px-4 py-2 text-xl text-primary-600 hover:border-primary-600 hover:bg-inherit'
          >
            Sign Out
          </Link>
        )}
        {!userData.username && route === 'register' && (
          <Link
            to='/login'
            onClick={() => setRoute('login')}
            className='rounded-md border-2 border-primary-500 px-4 py-2 text-xl text-primary-500 hover:bg-primary-600 hover:text-primary-100'
          >
            Sign In
          </Link>
        )}
        {!userData.username && route !== 'register' && (
          <Link
            to='/register'
            onClick={() => setRoute('register')}
            className='rounded-md border-2 border-slate-900 bg-primary-600 px-4 py-2 text-xl text-primary-100 hover:border-primary-600'
          >
            Join Us
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
