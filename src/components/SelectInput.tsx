import { Dispatch, SetStateAction } from 'react';
import { Activity, Routine } from '../types/types';

type Props = {
  activities: Activity[];
  setValue: Dispatch<SetStateAction<string>>;
  routine: Routine;
};

const SelectInput = ({ activities, setValue, routine }: Props) => {
  const addedActivities = routine.activities.map(activity => activity.id);

  return (
    <select
      className='w-full appearance-none rounded-md border border-solid border-slate-500 bg-inherit px-5 py-2 focus:outline-primary-500'
      onChange={event => {
        setValue(event.target.value);
      }}
    >
      <option value=''>Select Activity*</option>;
      {activities.map(activity => {
        if (addedActivities.includes(activity.id)) {
          // return (
          //   <option key={activity.id} value=''>
          //     {activity.name} (ADDED)
          //   </option>
          // );
          return;
        } else {
          return (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          );
        }
      })}
    </select>
  );
};

export default SelectInput;
