import * as usuarioModel from './usuario.model.js';

export async function getUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.getAllUsuarios();
    res.status(200).send({
      status: "ok",
      data: usuarios,
  })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
    console.error(error)
  }
}

export async function getUsuario(req, res) {
  try {
    const usuario = await usuarioModel.getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).send({
      status: "ok",
      data: usuario,
  })
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener usuario' });
  }
}

export async function createUsuario(req, res) {
  try {
    let data = req.body
    const nuevoUsuario = await usuarioModel.createUsuario(data);
    res.status(200).send({
      status: "ok",
      data: nuevoUsuario,
  })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

export async function updateUsuario(req, res) {
  try {
    const usuarioActualizado = await usuarioModel.updateUsuario(req.params.id, req.body);
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

export async function deleteUsuario(req, res) {
  try {
    await usuarioModel.deleteUsuario(req.params.id);
    res.status(200).send({
      status: "ok",
      data: ficha,
  })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}
