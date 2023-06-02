import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  token: string;
  route: string;
  setRoute: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
};

const Navbar = ({ token, route, setRoute, setToken }: Props) => {
  return (
    <nav className='flex items-center justify-between'>
      <h1>Logo</h1>
      <div className='flex justify-between gap-12'>
        <Link to='/' onClick={() => setRoute('home')}>
          Home
        </Link>
        <Link to='/pricing' onClick={() => setRoute('pricing')}>
          Pricing
        </Link>
        <Link to='/routines' onClick={() => setRoute('routines')}>
          Routines
        </Link>
        <Link to='/activities' onClick={() => setRoute('activities')}>
          Activities
        </Link>
      </div>
      {token && (
        <Link
          to='/'
          onClick={() => {
            localStorage.clear();
            setRoute('home');
            setToken('');
          }}
        >
          Sign Out
        </Link>
      )}
      {!token && route === 'register' && (
        <Link to='/login' onClick={() => setRoute('login')}>
          Sign In
        </Link>
      )}
      {!token && route !== 'register' && (
        <Link to='/register' onClick={() => setRoute('register')}>
          Join Us
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
