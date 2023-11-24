import jwt from 'jsonwebtoken';
import { Publicacion } from '../models/publicationModel.js';

class publicationController {
  static async createPublication(req, res) {
    const nuevaPublicacion = new Publicacion({ ...req.body });
    const publicacionInsertada = await nuevaPublicacion.save();
    return res.status(201).json(publicacionInsertada);
  }

  static async getAllPublications(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });

    try {
      jwt.verify(token, process.env.SECRET, async (err) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
      });

      const allPublications = await Publicacion.find();
      return res.status(200).json(allPublications);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
  }

  static async getPublication(req, res) {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });

    try {
      jwt.verify(token, process.env.SECRET, async (err) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
      });

      const publication = await Publicacion.findById(req.params.id);
      return res.status(200).json(publication);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener la publicación' });
    }
  }

  static async deletePublication(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;

    if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });

    try {
      jwt.verify(token, process.env.SECRET, async (err) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
      });

      const publicacionEliminada = await Publicacion.findByIdAndDelete(id);

      return res.status(200).json(publicacionEliminada);
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
  }

  static async updatePublication(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    const updatedPublicationData = req.body;

    if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });

    try {
      jwt.verify(token, process.env.SECRET, async (err) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });

        await Publicacion.findByIdAndUpdate(id, updatedPublicationData, { new: true });
      });

      const updatedPublication = await Publicacion.findById(id);

      return res.status(200).json(updatedPublication);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
  }
}

export default publicationController;
