import { Activity } from '../types/types';

type Props = {
  activity: Activity;
};

const Activity = ({ activity }: Props) => {
  return (
    <div className='max-h-96 border-[16px] border-teal-500 p-4 text-center shadow-[8px_8px_0_0_rgb(0,0,0,1)]'>
      <h1 className='text-xl font-black'>{activity.name}</h1>
      <p className='text-slate-700'>{activity.description}</p>
    </div>
  );
};

export default Activity;
