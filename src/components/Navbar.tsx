import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='max-w-7xl flex justify-between items-center mx-auto'>
      <h1>Logo</h1>
      <div className='flex justify-between gap-12'>
        <Link to='/'>Home</Link>
        <Link to='/pricing'>Pricing</Link>
        <Link to='/routines'>Routines</Link>
        <Link to='/activities'>Activities</Link>
      </div>
      <Link to='/register'>Join Us</Link>
    </nav>
  );
};

export default Navbar;
