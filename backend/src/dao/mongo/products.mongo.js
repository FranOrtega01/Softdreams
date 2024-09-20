import productModel from './models/products.models.js'

export default class Product{
    constructor(){}

    get = async () => {
        return await productModel.find().lean().exec();
    }

    getOneByID = async (id) => {
        return await productModel.findById({_id: id}).lean().exec()
    }

    getOneByModel = async (model) => {
        return await productModel.findOne({ modelo: model });
    }

    create = async(data) => {
        return await productModel.create(data)
    }

    update = async(model, newProduct) => {
        return await productModel.updateOne({modelo: model}, {$set: newProduct});
    }

    deleteOne = async(id) => {
        return await productModel.deleteOne({_id: id})
    }

    deleteAll = async() => {
        return await productModel.deleteMany();
    }
}