import jws from "jsonwebtoken";

export const generarToken = (payload, vida) => {
    const options = {
        expiresIn: vida
    }
    return jws.sign(payload, process.env.SALT, options);
};
