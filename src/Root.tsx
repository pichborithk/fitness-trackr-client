import { Outlet } from 'react-router-dom';
import { Navbar } from './components';

const Root = () => {
  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto flex flex-col items-center'>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
