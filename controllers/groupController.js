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
            return res.status(500).json({ error: "Error" });
        }
    }
}


export default groupController;
