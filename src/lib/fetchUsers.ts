import { Routine, TokenFetch, UserData } from '../types/types';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export async function registerUser(
  username: string,
  password: string
): Promise<TokenFetch> {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const result = await response.json();
  return result;
}

export async function userLogin(
  username: string,
  password: string
): Promise<TokenFetch> {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const result = await response.json();
  return result;
}

export async function fetchUserData(token: string): Promise<UserData> {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
}

export async function fetchUserRoutines(
  token: string,
  username: string
): Promise<Routine[]> {
  const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
}
