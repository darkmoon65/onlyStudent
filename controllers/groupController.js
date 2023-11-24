import jwt from 'jsonwebtoken';
import {Grupo} from '../models/groupModel.js'


class groupController {
   static async createGroup (req, res){
       const dataGroup = new Grupo ({...req.body});
       const groupInsert = await dataGroup.save();
       return res.status(201).json(groupInsert);
   }

   static async getAllGroups(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).json({ error: 'No se ha enviado el token' })

        try {
            jwt.verify(token, process.env.SECRET, async (err) => {
                if (err) return res.status(403).json({ error: 'Token inválido' })
            })

            const groups = await Grupo.find();
            return res.status(200).json(groups);

        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los grupos" });
        }
    }

    static async getGroup(req, res) {
        const token = req.headers.authorization.split(' ')[1];
    
        if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });
    
        try {
          jwt.verify(token, process.env.SECRET, async (err) => {
            if (err) return res.status(403).json({ error: 'Token inválido' });
          });
    
          const group = await Grupo.findById(req.params.id);
          return res.status(200).json(group);
        } catch (error) {
          return res.status(500).json({ error: 'Error al obtener el grupo' });
        }
      }

    static async getGroupsByName(req, res) {
        const nombre = req.params.nombre;
      
        if (!nombre) {
          return res.status(400).json({ error: "Se debe proporcionar un nombre" });
        }
      
        try {
          const groups = await Grupo.find({ nombre: nombre });
      
          if (groups.length === 0) {
            return res.status(404).json({ error: "No se encontraron grupos" });
          }
      
          return res.status(200).json(groups);
        } catch (error) {
          res.status(500).json({ error: "Error al buscar grupos" });
        }
      }
    
      static async deleteGroup(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = req.params;
    
        if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });
    
        try {
          jwt.verify(token, process.env.SECRET, async (err) => {
            if (err) return res.status(403).json({ error: 'Token inválido' });
          });
    
          const grupoEliminado = await Grupo.findByIdAndDelete(id);
    
          return res.status(200).json(grupoEliminado);
        } catch (error) {
          return res.status(500).json({ error: 'Error al eliminar el grupo' });
        }
      }
    
      static async updateGroup(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = req.params;
        const updatedGroupData = req.body;
    
        if (!token) return res.status(401).json({ error: 'No se ha enviado el token' });
    
        try {
          jwt.verify(token, process.env.SECRET, async (err) => {
            if (err) return res.status(403).json({ error: 'Token inválido' });
    
            await Grupo.findByIdAndUpdate(id, updatedGroupData, { new: true });
          });
    
          const updatedGroup = await Grupo.findById(id);
    
          return res.status(200).json(updatedGroup);
        } catch (error) {
          return res.status(500).json({ error: 'Error al actualizar el grupo' });
        }
      }

}


export default groupController;
