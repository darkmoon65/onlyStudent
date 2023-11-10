import jwt from 'jsonwebtoken';
import {Grupo} from '../models/groupModel.js'


class groupController {
   static async createGroup (req, res){
       const dataGroup = new Grupo ({...req.body});
       const groupInsert = await dataGroup.save();
       return res.status(201).json(groupInsert);
   }


}


export default groupController;
