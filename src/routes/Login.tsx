import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { FormEvent, useEffect, useState } from 'react';
import { userLogin } from '../lib/fetchUsers';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { token, setToken, setRoute } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('TOKEN', token);
      setRoute('home');
      navigate('/');
      return;
    }
  }, [token]);

  useEffect(() => {
    setRoute('login');
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const result = await userLogin(username, password);
      if (result.error) {
        toast.error(result.message);
        return;
      }

      if (result.token) {
        setToken(result.token);
        localStorage.setItem('TOKEN', result.token);
        setRoute('home');
        navigate('/');
        toast.success('Logged In');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUsername('');
      setPassword('');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border px-20 py-12 text-xl text-primary-100 shadow-full_white'
    >
      <h1 className='text-4xl font-bold text-primary-500'>Sign In</h1>
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
          className='border-secondary rounded-md border border-solid px-4 py-2 text-slate-700 focus:outline-primary-500'
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
          className='rounded-md border border-solid border-white px-4 py-2 text-slate-700 focus:outline-primary-500'
        />
        <i
          className={`fa-solid absolute bottom-3 right-4 text-primary-600  ${
            hidePassword ? 'fa-eye-slash' : 'fa-eye'
          } ${!password && 'hidden'}`}
          onClick={() => setHidePassword(!hidePassword)}
        ></i>
      </fieldset>
      <div className='mt-2 w-full text-center'>
        <button className='mb-2 w-full rounded-lg border-2 border-white px-4 py-2 font-semibold hover:bg-white hover:text-primary-500'>
          Sign In
        </button>
        <p className='text-base'>
          Forget{' '}
          <a href='#' className='text-slate-500 hover:text-primary-500'>
            Username / Password
          </a>{' '}
          ?
        </p>
        <p className='text-base'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='text-slate-500 hover:text-primary-500'
          >
            Join Us
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
