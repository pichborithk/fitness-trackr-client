import { Dispatch, SetStateAction } from 'react';

export type RootContext = {
  token: string;
  publicRoutines: Routine[];
  activities: Activity[];
  setToken: Dispatch<SetStateAction<string>>;
  setRoute: Dispatch<SetStateAction<string>>;
  userData: UserData;
  userRoutines: Routine[];
  refreshData: () => Promise<void>;
  route: string;
};

export type ViewRoutineContext = {
  routine: Routine;
  token: string;
  isOwner: boolean;
  refreshData: () => Promise<void>;
  activities: Activity[];
};

export type ViewActivityContext = {
  activity: Activity;
  refreshData: () => Promise<void>;
  userData: UserData;
  token: string;
  route: string;
};

export type TokenFetch = {
  message: string;
  token?: string;
  user?: {
    id: number;
    username: string;
  };
  error?: string;
  name?: string;
};

export type ErrorFetch = {
  error: string;
  message: string;
  name: string;
};

export type UserData = {
  id: number;
  username: string;
};

export type Routine = {
  creatorId: number;
  creatorName: string;
  goal: string;
  id: number;
  isPublic: true;
  name: string;
  activities: RoutineActivity[];
};

export type RoutineActivity = {
  id: number;
  name: string;
  description: string;
  count: number;
  duration: number;
  routineActivityId: number;
  routineId: number;
};

export type Activity = {
  id: number;
  description: string;
  name: string;
};

export type NewRoutineData = {
  name: string;
  goal: string;
  isPublic: boolean;
};

export type NewActivityData = {
  name: string;
  description: string;
};

export type NewRoutineActivityData = {
  activityId?: number;
  count: number;
  duration: number;
};
