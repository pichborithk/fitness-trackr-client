import { RoutineActivity } from '.';
import { Routine } from '../types/types';

type Props = {
  routine: Routine;
};

const RoutineCard = ({ routine }: Props) => {
  return (
    <div
      className='flex max-h-96 basis-96 overflow-hidden rounded-2xl
                shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]'
    >
      <img
        src={`http://placeimg.com/480/320/animals/${routine.id}`}
        alt='random photo'
      />
      <div className='relative flex w-full flex-col'>
        <div className='border-b-2 px-6 py-4'>
          <h3 className='text-2xl font-bold text-teal-500'>{routine.name}</h3>
          <h4>{routine.goal}</h4>
          <p className='text-right text-sm text-slate-700'>Create By:</p>
          <p className='text-right text-2xl font-bold'>{routine.creatorName}</p>
        </div>
        <div className='flex flex-col gap-2 px-6 py-4'>
          {routine.activities.map(activity => (
            <RoutineActivity activity={activity} key={activity.id} />
          ))}
        </div>
        <span className='absolute bottom-2 right-6 text-sky-700 underline'>
          See more...
        </span>
      </div>
    </div>
  );
};

export default RoutineCard;
