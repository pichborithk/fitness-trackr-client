import {
  ErrorFetch,
  NewRoutineActivityData,
  NewRoutineData,
  Routine,
} from '../types/types';

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

export async function createRoutine(
  token: string,
  data: NewRoutineData
): Promise<Routine & ErrorFetch> {
  const response = await fetch(`${BASE_URL}/routines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function updateRoutine(
  id: number,
  token: string,
  data: NewRoutineData
): Promise<Routine & ErrorFetch> {
  const response = await fetch(`${BASE_URL}/routines/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function deleteRoutine(
  id: number,
  token: string
): Promise<Routine & { success: boolean }> {
  const response = await fetch(`${BASE_URL}/routines/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function createRoutineActivity(
  id: number,
  data: NewRoutineActivityData
) {
  const response = await fetch(`${BASE_URL}/routines/${id}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function updateRoutineActivity(
  id: number,
  token: string,
  data: NewRoutineActivityData
) {
  const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function deleteRoutineActivity(id: number, token: string) {
  const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function fetchRoutinesByActivity(id: number) {
  const response = await fetch(`${BASE_URL}/activities/${id}/routines`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}
