import express from "express";
import {
  getCiudadanos,
  getCiudadano,
  createCiudadano,
  updateCiudadano,
  deleteCiudadano,
} from "./ciudadano.controller.js";

const router = express.Router();

// Rutas para Ciudadanos
router.get("/listarCiudadanos", getCiudadanos);
router.get("/listarCiudadano/:id", getCiudadano);
router.post("/crearCiudadano", createCiudadano);
router.put("/actualizarCiudadano/:id", updateCiudadano);
router.delete("/borrarCiudadano/:id", deleteCiudadano);

export default router;
