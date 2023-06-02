import { Routine } from '../types/types';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export async function fetchPublicRoutines(): Promise<Routine[]> {
  const response = await fetch(`${BASE_URL}/routines`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result;
}
