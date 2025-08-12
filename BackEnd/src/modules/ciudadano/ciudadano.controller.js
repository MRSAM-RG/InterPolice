import * as ciudadanoModel from './ciudadano.model.js';

export async function getCiudadanos(req, res) {
  try {
    const ciudadanos = await ciudadanoModel.getAllCiudadanos();
    res.status(200).send({
      status: "ok",
      data: ciudadanos,
    });
  } catch (error) {
    console.error('Error en getCiudadanos:', error);
    res.status(500).json({ error: 'Error al obtener ciudadanos' });
  }
}

export async function getCiudadano(req, res) {
  try {
    console.log('Buscando ciudadano con ID:', req.params.id);
    const ciudadano = await ciudadanoModel.getCiudadanoById(req.params.id);
    console.log('Ciudadano encontrado:', ciudadano);
    
    if (!ciudadano) return res.status(404).json({ error: 'Ciudadano no encontrado' });
    res.status(200).send({
      status: "ok",
      data: ciudadano,
    });
  } catch (error) {
    console.error('Error en getCiudadano:', error);
    res.status(500).json({ error: 'Error al obtener ciudadano' });
  }
}

export async function createCiudadano(req, res) {
  try {
    console.log('Creando ciudadano con datos:', req.body);
    const nuevoCiudadano = await ciudadanoModel.createCiudadano(req.body);
    console.log('Ciudadano creado:', nuevoCiudadano);
    res.status(200).send({
      status: "ok",
      data: nuevoCiudadano,
    });
  } catch (error) {
    console.error('Error en createCiudadano:', error);
    res.status(500).json({ error: 'Error al crear ciudadano' });
  }
}

export async function updateCiudadano(req, res) {
  try {
    console.log('Actualizando ciudadano con ID:', req.params.id);
    console.log('Datos a actualizar:', req.body);
    
    const ciudadanoActualizado = await ciudadanoModel.updateCiudadano(req.params.id, req.body);
    console.log('Ciudadano actualizado:', ciudadanoActualizado);
    
    res.status(200).send({
      status: "ok",
      data: ciudadanoActualizado,
    });
  } catch (error) {
    console.error('Error en updateCiudadano:', error);
    res.status(500).json({ error: 'Error al actualizar ciudadano' });
  }
}

export async function deleteCiudadano(req, res) {
  try {
    console.log('Eliminando ciudadano con ID:', req.params.id);
    await ciudadanoModel.deleteCiudadano(req.params.id);
    res.status(200).send({
      status: "ok",
      data: { codigo: req.params.id },
    });
  } catch (error) {
    console.error('Error en deleteCiudadano:', error);
    res.status(500).json({ error: 'Error al eliminar ciudadano' });
  }
}
