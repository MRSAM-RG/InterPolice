import db from '../../config/dbconexion.js';

// Obtener todos los usuarios
export async function getAllUsuarios() {
  const [rows] = await db.query('SELECT * FROM usuario');
  return rows;
}

// Obtener usuario por ID
export async function getUsuarioById(id) {
  const [rows] = await db.query('SELECT * FROM Usuario WHERE idUsuario = ?', [id]);
  return rows[0];
}

// Crear usuario
export async function createUsuario(usuario) {
  const { nombre_usuario, correo_usuario, password_usuario, rol_usuario, fecha_usuario } = usuario;
  const [result] = await db.query(
    'INSERT INTO Usuario (nombre_usuario, correo_usuario, password_usuario, rol_usuario, fecha_usuario) VALUES (?, ?, ?, ?, ?)',
    [nombre_usuario, correo_usuario, password_usuario, rol_usuario, fecha_usuario]
  );
  return { idUsuario: result.insertId, ...usuario };
}

// Actualizar usuario
export async function updateUsuario(id, usuario) {
  const { nombre_usuario, correo_usuario, password_usuario, rol_usuario, fecha_usuario } = usuario;
  await db.query(
    'UPDATE Usuario SET nombre_usuario=?, correo_usuario=?, password_usuario=?, rol_usuario=?, fecha_usuario=? WHERE idUsuario=?',
    [nombre_usuario, correo_usuario, password_usuario, rol_usuario, fecha_usuario, id]
  );
  return { idUsuario: id, ...usuario };
}

// Eliminar usuario
export async function deleteUsuario(id) {
  await db.query('DELETE FROM Usuario WHERE idUsuario = ?', [id]);
  return { idUsuario: id };
}
