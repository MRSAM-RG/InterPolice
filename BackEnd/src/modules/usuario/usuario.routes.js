import express from "express";
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  authUsuario,
} from "./usuario.controller.js";
import * as midelware from '../../middlewares/auth.js';

const router = express.Router();

// Rutas RESTful estándar
router.get("/", getUsuarios); // GET /api/usuarios
router.get("/:id", getUsuario); // GET /api/usuarios/:id
router.post("/", createUsuario); // POST /api/usuarios
router.post("/login", authUsuario); // POST /api/usuarios/login
router.put("/:id", updateUsuario); // PUT /api/usuarios/:id
router.delete("/:id", deleteUsuario); // DELETE /api/usuarios/:id

export default router;
