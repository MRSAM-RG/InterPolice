const API_URL = 'http://localhost:4100/api/ciudadanos';

export async function getCiudadanos() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function getCiudadano(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    return null;
  }
  return await res.json();
}

export async function createCiudadano(ciudadano) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ciudadano)
  });
  return await res.json();
}

export async function updateCiudadano(id, ciudadano) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ciudadano)
  });
  return await res.json();
}

export async function deleteCiudadano(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return await res.json();
} 