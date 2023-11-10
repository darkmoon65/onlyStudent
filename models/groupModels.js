import mongoose from 'mongoose';


const memberSchema = new mongoose.Schema({
   nombre: {
       type: String,
       required: true
   },
})


const groupSchema = new mongoose.Schema({
   nombre: {
       type: String,
       required: true
   },


   descripcion: {
       type: String,
       required: true
   },


   creador: {
       type: String,
       required: true
   },


   miembros: [memberSchema],
})


const Grupo = mongoose.model('grupo', groupSchema) ;


export {
   Grupo
}
