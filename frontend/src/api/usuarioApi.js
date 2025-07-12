const API_URL = 'http://localhost:4100/api/usuarios';

export async function getUsuarios() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function getUsuario(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

export async function createUsuario(usuario) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  return await res.json();
}

export async function updateUsuario(id, usuario) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  return await res.json();
}

export async function deleteUsuario(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return await res.json();
} 