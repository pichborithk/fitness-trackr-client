import { Activity } from '../types/types';

type Props = {
  activity: Activity;
};

const Activity = ({ activity }: Props) => {
  return (
    <>
      <h2>Activity</h2>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
    </>
  );
};

export default Activity;
