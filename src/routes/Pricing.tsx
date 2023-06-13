import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { useEffect } from 'react';

const Pricing = () => {
  const { setRoute } = useOutletContext<RootContext>();

  useEffect(() => {
    setRoute('pricing');
  }, []);

  return (
    <>
      <h1 className='mb-4 border-b-8 border-t-8 px-8 py-2 text-center text-4xl font-bold'>
        PRICING
      </h1>
      <div className='flex w-full gap-8 px-20'>
        <div className='flex flex-1 flex-col justify-between gap-8 overflow-hidden rounded-lg text-xl shadow-full_white'>
          <div>
            <h3 className='bg-slate-500 p-4 text-center text-3xl font-bold'>
              Starter
            </h3>
            <div className='px-8 py-4 font-lora'>
              <h3 className='text-center text-3xl font-bold'>Free</h3>
              <h4 className='mb-4 text-center text-lg text-slate-400'>
                Forever
              </h4>
              <p>✓ Lacus eros </p>
              <p>✓ Ultricies amet</p>
              <p>✓ Leo donec</p>
              <p>✓ Facilisi purus.</p>
            </div>
          </div>
          <div className='p-4'>
            <button className='w-full rounded-md border-2 border-primary-100 p-2 font-semibold'>
              Sign Up
            </button>
          </div>
        </div>
        <div className='flex flex-1 flex-col justify-between gap-8 overflow-hidden rounded-lg text-xl shadow-full_white'>
          <div>
            <h3 className='bg-primary-600 p-4 text-center text-3xl font-bold'>
              Professional
            </h3>
            <div className='px-8 py-4 font-lora'>
              <h3 className='text-center text-3xl font-bold'>
                8.99$ per Month
              </h3>
              <h4 className='mb-4 text-center text-lg text-slate-400'>
                Billed annually or $9.99 month-month
              </h4>
              <p>✓ Mattis integer</p>
              <p>✓ Malesuada amet</p>
              <p>✓ Tempus erat</p>
              <p>✓ Vulputate quis</p>
              <p>✓ Luctus nullam</p>
              <p>✓ Pellentesque montes</p>
            </div>
          </div>
          <div className='p-4'>
            <button className='w-full rounded-md border-2 border-primary-100 p-2 font-semibold'>
              Sign Up
            </button>
          </div>
        </div>
        <div className='flex flex-1 flex-col justify-between gap-8 overflow-hidden rounded-lg text-xl shadow-full_white'>
          <div>
            <h3 className='bg-yellow-600 p-4 text-center text-3xl font-bold'>
              Exclusive
            </h3>
            <div className='px-8 py-4 font-lora'>
              <h3 className='text-center text-3xl font-bold'>
                14.99$ per Month
              </h3>
              <h4 className='mb-4 text-center text-lg text-slate-400'>
                Annually billing only
              </h4>
              <p>✓ Ullamcorper maecenas</p>
              <p>✓ Nunc erat sed ultrices</p>
              <p>✓ Et eu bibendum vitae</p>
              <p>✓ Placerat dolor rhoncus</p>
              <p>✓ Pharetra tempor.</p>
              <p>✓ Lectus condimentum</p>
              <p>✓ Tempus vitae.</p>
            </div>
          </div>
          <div className='p-4'>
            <button className='w-full rounded-md border-2 border-primary-100 p-2 font-semibold'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Pricing;
