import UserModel from './models/users.model.js'

export default class User{
    constructor(){}

    get = async() => {
        return await UserModel.find().lean().exec()
    }

    getOneByID = async(id) => {
        return await UserModel.findById({_id:id}).lean().exec();
    }

    getOneByEmail = async(email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }
    
    create = async(data) => {
    return await UserModel.create(data)
    }

    update = async(id, updUser)=>{
        const result = await UserModel.updateOne({_id: id}, {$set:updUser});
        return result;
    }

    deleteOne = async(id) => {
        return await UserModel.deleteOne({_id: id})
    }
}