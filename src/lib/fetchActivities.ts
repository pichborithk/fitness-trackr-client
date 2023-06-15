import { Activity, ErrorFetch, NewActivityData } from '../types/types';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export async function fetchActivities(): Promise<Activity[]> {
  const response = await fetch(`${BASE_URL}/activities`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result;
}

export async function createActivity(
  token: string,
  data: NewActivityData
): Promise<Activity & ErrorFetch> {
  const response = await fetch(`${BASE_URL}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function updateActivity(
  id: number,
  token: string,
  data: NewActivityData
) {
  const response = await fetch(`${BASE_URL}/activities/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
