import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./src/modules/usuario/usuario.routes.js";
import ciudadanoRoutes from "./src/modules/ciudadano/ciudadano.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ciudadanos', ciudadanoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});