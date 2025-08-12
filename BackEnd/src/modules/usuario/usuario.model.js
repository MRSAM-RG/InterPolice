import db from '../../config/dbconexion.js';
import bcrypt from "bcryptjs";

// Obtener todos los usuarios
export async function getAllUsuariosBD() {
  const [rows] = await db.query('SELECT * FROM Usuario');
  return rows;
}

// Obtener usuario por ID
export async function getUsuarioByIdBD(id) {
  const [rows] = await db.query('SELECT * FROM Usuario WHERE idUsuario = ?', [id]);
  return rows[0];
}

// Crear usuario
export async function createUsuarioBD(usuario) {
  let email = usuario.correo_usuario;

  const [EmailExiste] = await db.query('SELECT * FROM Usuario WHERE correo_usuario = ?', [email]);

  if (EmailExiste.length > 0) {
    throw new Error('El correo ya está en uso');
  }

  const { nombre_usuario, correo_usuario, password_usuario, rol_usuario, fecha_usuario } = usuario;
  const [result] = await db.query(
    'INSERT INTO Usuario SET ?',
    [{ nombre_usuario, correo_usuario, password_usuario: bcrypt.hashSync(password_usuario, 10), rol_usuario, fecha_usuario }]
  );
  return { idUsuario: result.insertId, ...usuario };
}

// Actualizar usuario
export async function updateUsuarioBD(id, usuario) {
  const { nombre_usuario, correo_usuario, password_usuario, rol_usuario, fecha_usuario } = usuario;
  await db.query(
    'UPDATE Usuario SET ? WHERE idUsuario = ?',
    [{ nombre_usuario, correo_usuario, password_usuario, rol_usuario, fecha_usuario }, id]
  );
  return { idUsuario: id, ...usuario };
}

// Eliminar usuario
export async function deleteUsuarioBD(id) {
  await db.query('DELETE FROM Usuario WHERE idUsuario = ?', [id]);
  return { idUsuario: id };
}

import bcrypt from "bcrypt";

export async function authUsuarioBD(correo, password) {
  const [rows] = await db.query(
    "SELECT * FROM Usuario WHERE correo_usuario = ?",
    [correo]
  );

  if (!rows.length) {
    return null;
  }

  const usuario = rows[0];

  const esValida = await bcrypt.compare(password, usuario.password_usuario);

  if (!esValida) {
    return null;
  }

  delete usuario.password_usuario;
  return usuario;
}
