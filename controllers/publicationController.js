import jwt from 'jsonwebtoken';
import { Publicacion } from '../models/publicationModel.js';
import multer from 'multer';


// storage de imagenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

class publicationController {
  
  static async createPublication(req, res) {

    try {

      upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Error al procesar la imagen' });
        } else if (err) {
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
        try {
          const { usuario, fecha, descripcion } = req.body;
          const nuevaPublicacion = new Publicacion({ usuario,fecha, descripcion, contenidoPub: { 'url': req.file.path} });
          const publicacionInsertada = await nuevaPublicacion.save();
          return res.status(201).json(publicacionInsertada);
        }
        catch(err){
          return res.status(500).json({ error: 'Error al crear la publicacion' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear la publicacion' });
    }
  }

  static async getAllPublications(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });

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
