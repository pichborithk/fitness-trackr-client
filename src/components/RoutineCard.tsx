import { Link } from 'react-router-dom';
import { RoutineActivity } from '.';
import { Routine } from '../types/types';

type Props = {
  routine: Routine;
  route: string;
};

const RoutineCard = ({ routine, route }: Props) => {
  return (
    <div className='flex max-h-96 basis-96 overflow-hidden rounded-2xl text-primary-100 shadow-full_white'>
      <img
        src={`http://placeimg.com/320/320/animals/${routine.id}`}
        alt='random photo'
      />
      <div className='relative flex w-full flex-col'>
        <div className='border-b-2 px-6 py-4'>
          <h3 className='text-2xl font-bold text-primary-500'>
            {routine.name}
          </h3>
          <h4 className='font-lora text-primary-100'>{routine.goal}</h4>
          {route !== 'profile' && (
            <>
              <p className='text-right font-lora text-sm text-slate-400'>
                Create By:
              </p>
              <p className='text-right text-2xl font-bold'>
                <Link
                  to={`/${routine.creatorName}`}
                  className='hover:text-primary-500'
                >
                  {routine.creatorName}
                </Link>
              </p>
            </>
          )}
        </div>
        <div className='flex flex-col gap-2 px-6 py-4'>
          {routine.activities.map(activity => (
            <RoutineActivity activity={activity} key={activity.id} />
          ))}
        </div>
        <Link
          to={`/routines/${routine.id}`}
          className='absolute bottom-4 right-6 rounded-md border border-primary-500 p-2 font-semibold text-primary-500 hover:bg-primary-600 hover:text-primary-100'
        >
          See more...
        </Link>
      </div>
    </div>
  );
};

export default RoutineCard;
