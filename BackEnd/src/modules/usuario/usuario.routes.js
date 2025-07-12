import express from "express";
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./usuario.controller.js";

const router = express.Router();

// Rutas para Usuarios
router.get("/listarUsuarios", getUsuarios);
router.get("/listarUsuario/:id", getUsuario);
router.post("/crearUsuario", createUsuario);
router.put("/actualizarUsuario/:id", updateUsuario);
router.delete("/borrarUsuario/:id", deleteUsuario);

export default router;
