import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import { RootContext } from '../types/types';
import { registerUser } from '../lib/fetchUsers';

const Register = () => {
  const { token, setToken, setRoute } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setNotification('');
    if (token) {
      localStorage.setItem('TOKEN', token);
      navigate('/');
      return;
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setNotification('Password do not match');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const result = await registerUser(username, password);
      if (result.error) {
        setNotification(result.message);
        return;
      }

      if (result.token) {
        setToken(result.token);
        localStorage.setItem('TOKEN', result.token);
        navigate('/');
        setRoute('home');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 bg-teal-500 px-20 py-12 text-xl text-white shadow-md'
    >
      <h1 className='text-4xl'>Create An Account</h1>
      <fieldset className='flex w-full flex-col'>
        <label htmlFor='username' className='px-4 py-2'>
          Username
        </label>
        <input
          autoComplete='off'
          type='text'
          name='username'
          placeholder='Enter Username'
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
          className='border-secondary rounded-md border border-solid px-4 py-2 text-slate-700 focus:outline-teal-500'
        />
      </fieldset>
      <fieldset className='relative flex w-full flex-col'>
        <label htmlFor='password' className='px-4 py-2'>
          Password
        </label>
        <input
          type={hidePassword ? 'password' : 'text'}
          name='password'
          placeholder='Enter Password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          className='rounded-md border border-solid border-white px-4 py-2 text-slate-700 focus:outline-teal-500'
        />
        <i
          className={`fa-solid absolute bottom-3 right-4 text-teal-500  ${
            hidePassword ? 'fa-eye-slash' : 'fa-eye'
          } ${!(password || confirmPassword) && 'hidden'}`}
          onClick={() => setHidePassword(!hidePassword)}
        ></i>
      </fieldset>
      <fieldset className='relative flex w-full flex-col'>
        <label htmlFor='confirm-password' className='px-4 py-2'>
          Password Confirmation
        </label>
        <input
          type={hidePassword ? 'password' : 'text'}
          name='confirm-password'
          placeholder='Re-enter Password'
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
          required
          className='rounded-md border border-solid border-white px-4 py-2 text-slate-700 focus:outline-teal-500'
        />
        <i
          className={`fa-solid absolute bottom-3 right-4 text-teal-500  ${
            hidePassword ? 'fa-eye-slash' : 'fa-eye'
          } ${!(password || confirmPassword) && 'hidden'}`}
          onClick={() => setHidePassword(!hidePassword)}
        ></i>
      </fieldset>
      <div className='mt-2 w-full text-center'>
        <button className='mb-2 w-full rounded-lg border-2 border-white px-4 py-2 hover:bg-white hover:text-teal-500'>
          Create Account
        </button>
        <p>
          Already Have An Account?{' '}
          <Link to='/login' className='underline'>
            Sign in
          </Link>
        </p>
      </div>
      <span className='absolute bottom-4 text-base text-white'>
        {notification}
      </span>
    </form>
  );
};

export default Register;
