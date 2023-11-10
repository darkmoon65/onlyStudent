
import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    url:  {
      type: String,
      required: true
    }
});

const reaccionSchema = new mongoose.Schema({
    usuario: String,
    fecha: String,
    reaccion: String
});

const comentarioSchema = new mongoose.Schema({
    usuario: String,
    fecha: String,
    comentario: String
});

const publicationSchema = mongoose.Schema( { 
    usuario : {
        type : String,
        required : true
    },
    fecha: {
        type : Date,
        required : true
    },
    descripcion: {
        type: String,
        required: true
    },
    reaccionPub: [reaccionSchema],
    contenidoPub: [contentSchema],
    comentariosPub: [comentarioSchema]
})

const Publicacion = mongoose.model("publicacion", publicationSchema);

export { Publicacion };


