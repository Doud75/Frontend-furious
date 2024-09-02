export async function postFetch(url, data) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers,
    });

    if (!response.ok) {
      if (response.status !== 500) {
        return response.status;
      }
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}

export async function getFetch(url) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
