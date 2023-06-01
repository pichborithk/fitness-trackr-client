import { Dispatch, SetStateAction } from 'react';

export type RootContext = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export type TokenFetch = {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
  };
  error: string | null;
  name?: string;
};
