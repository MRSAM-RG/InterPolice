import * as ciudadanoModel from './ciudadano.model.js';

export async function getCiudadanos(req, res) {
  try {
    const ciudadanos = await ciudadanoModel.getAllCiudadanos();
    res.json(ciudadanos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ciudadanos' });
  }
}

export async function getCiudadano(req, res) {
  try {
    const ciudadano = await ciudadanoModel.getCiudadanoById(req.params.id);
    if (!ciudadano) return res.status(404).json({ error: 'Ciudadano no encontrado' });
    res.json(ciudadano);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ciudadano' });
  }
}

export async function createCiudadano(req, res) {
  try {
    const nuevoCiudadano = await ciudadanoModel.createCiudadano(req.body);
    res.status(201).json(nuevoCiudadano);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear ciudadano' });
  }
}

export async function updateCiudadano(req, res) {
  try {
    const ciudadanoActualizado = await ciudadanoModel.updateCiudadano(req.params.id, req.body);
    res.json(ciudadanoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar ciudadano' });
  }
}

export async function deleteCiudadano(req, res) {
  try {
    await ciudadanoModel.deleteCiudadano(req.params.id);
    res.json({ mensaje: 'Ciudadano eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar ciudadano' });
  }
}
