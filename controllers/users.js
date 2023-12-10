import jwt from 'jsonwebtoken';
import { Usuario } from '../models/userModel.js';

class userController {
    static async createUser(req, res) {
        const nuevoUsuario = new Usuario({ ...req.body });
        try{
            const usuarioInsertado = await nuevoUsuario.save();
            return res.status(201).json(usuarioInsertado);
        }catch(error){
            return res.status(500).json({ error: "Error al crear el usuario" });
        }

       
    }

    static async getAllUsers(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })
            })

            const allUsers = await Usuario.find();
            return res.status(200).json(allUsers);

        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar el usuario" });
        }
    }

    static async getUser(req, res) {
        const token = req.headers.authorization.split(' ')[1]

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })
            })
            const user = await Usuario.findById(req.params.id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar el usuario" });
        }

    }

    static async deleteUser(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params;

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })
            })

            // Recupera el usuario actualizado
            const usuarioEliminado = await Usuario.findByIdAndDelete(id);

            return res.status(200).json(usuarioEliminado);
        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar el usuario" });
        }

    }

    static async updateUser(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = req.params;
        const updatedUserData = req.body;

        if (!token)
            return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err)
                    return res.status(403).json({ error: 'Token inválido' })

                // Actualiza el usuario en la base de datos
                await Usuario.updateOne({ _id: id }, updatedUserData);
            })

            // Recupera el usuario actualizado
            const updatedUser = await Usuario.findById(id);

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar el usuario" });
        }
    }

    static async getUsersByName(req, res) {
        const nombre = req.params.nombre;

        if (!nombre) {
            return res.status(400).json({ error: "Se debe proporcionar un nombre" });
        }

        try {
            const users = await Usuario.find({ nombre: nombre });

            if (users.length === 0) {
                return res.status(404).json({ error: "No se encontraron usuarios" });
            }

            return res.status(200).json(users);
        } catch {
            res.status(500).json({ error: "Error al buscar usuarios" });
        }
    }
}

export default userController;
