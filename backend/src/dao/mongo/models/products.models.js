import mongoose from "mongoose";

const productCollection = 'test';

const productSchema = new mongoose.Schema({
    modelo: {
        type: String,
        unique: true,
    },
    id: String,
    descripcion: String,
    medidas: String,
    peso: String,
    nucleo: String,
    tela: String,
    altura: String,
    garantia: String,
    thumbnails: Array,
});

const productModel = mongoose.model(productCollection, productSchema)

export default productModel