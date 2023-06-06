import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../types/types';

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
  return (
    <nav className='flex items-center justify-between py-4 text-3xl'>
      <h1>Logo</h1>
      <div className='flex justify-between gap-12'>
        <Link to='/' onClick={() => setRoute('home')}>
          Home
        </Link>
        {!userData.username && (
          <Link to='/pricing' onClick={() => setRoute('pricing')}>
            Pricing
          </Link>
        )}
        <Link to='/routines' onClick={() => setRoute('routines')}>
          Routines
        </Link>
        <Link to='/activities' onClick={() => setRoute('activities')}>
          Activities
        </Link>
        {userData.username && (
          <Link to='/profile' onClick={() => setRoute('profile')}>
            Profile
          </Link>
        )}
      </div>
      {userData.username && (
        <Link
          to='/'
          onClick={() => {
            localStorage.clear();
            setRoute('home');
            setToken('');
            setUserData({ id: 0, username: '' });
          }}
        >
          Sign Out
        </Link>
      )}
      {!userData.username && route === 'register' && (
        <Link to='/login' onClick={() => setRoute('login')}>
          Sign In
        </Link>
      )}
      {!userData.username && route !== 'register' && (
        <Link to='/register' onClick={() => setRoute('register')}>
          Join Us
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
