const path = require ("path")
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extencionesValidas = ['jpg', 'jpeg', 'png', 'gif'], carpeta='') =>{

    return new Promise ((resolve, reject) =>{
        const {archivo} = files;

        // Validar la extencion
        const nombreCortado = archivo.name.split('.');
        const extencion    = nombreCortado[nombreCortado.length -1];
     
        if (!extencionesValidas.includes(extencion)){
            return reject(`No es un extencion valida. Extenciones validas: ${extencionesValidas}`);
        }
        // renombro el archivo
        const nombreArchivo = uuidv4()+'.'+extencion;
     
        const uploadPath = path.join( __dirname , '../uploads/', carpeta, nombreArchivo);
       
         archivo.mv(uploadPath, (err) => {
           if (err) {
             reject(err);
           }
       
           resolve(nombreArchivo);
         });
    })

}

module.exports = {
    subirArchivo
}