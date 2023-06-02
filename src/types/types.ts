import { Dispatch, SetStateAction } from 'react';

export type RootContext = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  setRoute: Dispatch<SetStateAction<string>>;
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

export type UserData = {
  id: number;
  username: string;
};
