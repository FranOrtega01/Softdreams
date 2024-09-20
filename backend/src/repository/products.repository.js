export default class ProductRepository{
    constructor(dao){
        this.dao = dao
    }

    get = async () => {
        try {
            return await this.dao.get()
        } catch (error) {
            throw new Error(error);
        }
    }
    getOneByID = async (id) => {
        try {
            return await this.dao.getOneByID(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    getOneByEmail = async(email) => {
        try {
            return await this.dao.getOneByEmail(email);
        } catch (error) {
            throw new Error(error);
        }
    }

    getOneByModel = async(model) => {
        try {
            return await this.dao.getOneByModel(model);
        } catch (error) {
            throw new Error(error);
        }
    }

    create = async (data) => {
        try {
            return await this.dao.create(data)
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    update = async (id, updProd) => {
        try {
            return await this.dao.update(id, updProd);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    deleteOne = async (id) => {
        try {
            return await this.dao.deleteOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteAll = async () => {
        try {
            return await this.dao.deleteAll();
        } catch (error) {
            throw new Error(error);
        }
    }
}