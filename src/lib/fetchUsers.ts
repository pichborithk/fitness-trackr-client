import { TokenFetch } from '../types/types';

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
