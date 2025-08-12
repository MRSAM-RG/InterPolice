const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  try{
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'Token requerido' });

    let tokenOk = jwt.verify(token, process.env.SALT);
    
    next();
  }
  catch (error) {
    res.status(401).send({
      status: "Error",
      message: 'No autorizado: ' + error
    });
  }
}

function verificarRol(roles = []) {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol_usuario)) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    next();
  };
}

module.exports = { verificarToken, verificarRol };
