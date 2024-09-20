import fs from 'fs'
import __dirname from '../utils.js'
import path from 'path';
import sharp from 'sharp';

export const deleteImgsFromFolder = (id, newImgs) => {
    const dir = __dirname + `/public/img/products/${id}`;
    fs.readdir(dir, (err, currentImgs) => {
        if (err) {
            return console.log('Error al leer la dir:', err);
        }
       
        // Filtrar los imgs que no contienen ningún nombre en nombresPermitidos
        const imgsParaBorrar = currentImgs.filter(archivo =>
            !newImgs.some(nombre => archivo.includes(nombre))
        );
        
        // Borrar los imgs no permitidos
        imgsParaBorrar.forEach(archivo => {
            const rutaArchivo = path.join(dir, archivo);
            fs.unlink(rutaArchivo, (err) => {
                if (err) {
                    console.log(`Error al borrar el archivo ${archivo}:`, err);
                } else {
                    console.log(`Archivo borrado: ${archivo}`);
                }
            });
        });
    })
}

export const compressAndUploadFiles = async (files, id) => {
    const dir = `${__dirname}/public/img/products/${id}`
    fs.mkdirSync(dir, { recursive: true });

    await Promise.all(files.map(async (file) => {
        const outputPath = path.join(dir, `${file.originalname.split(' ').join('-').toLowerCase()}`);
        await sharp(file.buffer)
            .jpeg({ quality: 80 })
            .toFile(outputPath);

        return `/img/products/${id}/${file.originalname.split(' ').join('-').toLowerCase()}`;
    }));
}