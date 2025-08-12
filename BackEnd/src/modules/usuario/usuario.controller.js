import * as usuarioModel from './usuario.model.js';
import {generarToken} from '../helpers/adminTokens.js';

export async function getUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.getAllUsuariosBD();
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
    const usuario = await usuarioModel.getUsuarioByIdBD(req.params.id);
    if (!usuario){
      throw{
        status: "Error",
        message: "Usuario no encontrado",
        statusCode: 404
      }
    }

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).send({
      status: "ok",
      data: usuario,
  })
  } catch (error) {
    console.error('Error en getUsuario:', error);
    res.status(500).send({ error: 'Error al obtener usuario' });
  }
}

export async function createUsuario(req, res) {
  try {
    let data = req.body

    try{
      let validarEmail = !validator.isEmpty(data.usuario.correo_usuario) ||
      !validator.isEmpty(data.usuario.password_usuario) || !validator.isLength({min: 5, max: 12})

      if(!validarEmail){
        return res.status(400).json({ error: 'Datos ingresados no cumplen requerimientos' });
      }
    }
    catch(error){
      console.error('Error al procesar datos del usuario:', error);
      return res.status(400).json({ error: 'Datos de usuario inválidos' });
    }

    const nuevoUsuario = await usuarioModel.createUsuarioBD(data);
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
    const usuarioActualizado = await usuarioModel.updateUsuarioBD(req.params.id, req.body);
    if (usuarioActualizado.affectedRows === 0){
      throw{
        status: "Error",
        message: "No se pudo actualizar el usuario",
        statusCode: 404,
      };
    }

    res.status(200).send({
      status: "ok",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.error('Error en updateUsuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

export async function deleteUsuario(req, res) {
  try {
    const result = await usuarioModel.deleteUsuarioBD(req.params.id);
    if (result.affectedRows === 0){
      throw{
        status: "Error",
        message: "No se pudo eliminar el usuario",
        statusCode: 404,
      };
    }
    res.status(200).send({
      status: "ok",
      data: { idUsuario: req.params.id },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

export async function authUsuario(req, res) {
  try{
    let data = req.body;

    try{
    }
    catch(error){
      console.error('Error al procesar datos de autenticación:', error);
      res.status(400).json({ error: 'Datos de autenticación inválidos' });
    }

    const usuario = await usuarioModel.authUsuarioBD(data);

    if (!usuario) {
      const token = generarToken(usuario[0], process.env.TOKEN_LIFE);
      res.status(200).send({
      status: "ok",
      usuario: usuario[0].usuario_email,
      token: token,
    }); 
    } 

    
  }
  catch(error){
    console.error('Error en authUsuario:', error);
    res.status(500).send({ error: 'Error en la autenticación de usuario' });
  }
}
