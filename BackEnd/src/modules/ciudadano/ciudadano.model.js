import db from '../../config/dbconexion.js';

// Obtener todos los ciudadanos
export async function getAllCiudadanos() {
  try {
    console.log('Ejecutando getAllCiudadanos...');
    const [rows] = await db.query('SELECT * FROM Ciudadano');
    console.log('Ciudadanos obtenidos:', rows);
    return rows;
  } catch (error) {
    console.error('Error en getAllCiudadanos:', error);
    throw error;
  }
}

// Obtener ciudadano por ID
export async function getCiudadanoById(id) {
  try {
    console.log('Ejecutando getCiudadanoById con ID:', id);
    const [rows] = await db.query('SELECT * FROM Ciudadano WHERE codigo = ?', [id]);
    console.log('Ciudadano encontrado:', rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Error en getCiudadanoById:', error);
    throw error;
  }
}

// Crear ciudadano
export async function createCiudadano(ciudadano) {
  const { nombre, apellido, apodo, fecha_nacimiento, planeta_origen, planeta_residencia, foto, codigo_qr, estado_id_estado } = ciudadano;
  const [result] = await db.query(
    'INSERT INTO Ciudadano (nombre, apellido, apodo, fecha_nacimiento, planeta_origen, planeta_residencia, foto, codigo_qr, estado_id_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellido, apodo, fecha_nacimiento, planeta_origen, planeta_residencia, foto, codigo_qr, estado_id_estado]
  );
  return { codigo: result.insertId, ...ciudadano };
}

// Actualizar ciudadano
export async function updateCiudadano(id, ciudadano) {
  const { nombre, apellido, apodo, fecha_nacimiento, planeta_origen, planeta_residencia, foto, codigo_qr, estado_id_estado } = ciudadano;
  await db.query(
    'UPDATE Ciudadano SET nombre=?, apellido=?, apodo=?, fecha_nacimiento=?, planeta_origen=?, planeta_residencia=?, foto=?, codigo_qr=?, estado_id_estado=? WHERE codigo=?',
    [nombre, apellido, apodo, fecha_nacimiento, planeta_origen, planeta_residencia, foto, codigo_qr, estado_id_estado, id]
  );
  return { codigo: id, ...ciudadano };
}

// Eliminar ciudadano
export async function deleteCiudadano(id) {
  await db.query('DELETE FROM Ciudadano WHERE codigo = ?', [id]);
  return { codigo: id };
}
