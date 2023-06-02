const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export async function fetchActivities() {
  const response = await fetch(`${BASE_URL}/activities`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  console.log(result);
  return result;
}
