import jwt from "jsonwebtoken";

import { Usuario } from "../models/userModel.js";

class authController {

    static async login(req, res) {
        const { correo, contrasena } = req.body;

        try {
            const user = await Usuario.findOne({ correo: correo });

            if (!user) {
                return res.status(401).json({ error: "Usuario no encontrado" });
            }

            if (contrasena != user.contrasena) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }

            const userForToken = {
                correo: user.correo
            }

            const token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 30 });
            res.send({ token, correo: user.correo, id: user.id })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }

    }

    static register(req, res) {

    }
}


export default authController;