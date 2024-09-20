import __dirname from '../utils.js';
import UserDTO from '../dao/dto/users.dto.js';

export default class UserRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async () => {
        try {
            return await this.dao.get();
        } catch (error) {
            throw new Error(error)
        }
    }

    create = async (data) => {
        try {
            const dataToInsert = new UserDTO(data)
            return await this.dao.create(dataToInsert)
        } catch (error) {
            throw new Error(error);
            
        }
    }

    getOneByID = async (id) => {
        try {
            return await this.dao.getOneByID(id)
        } catch (error) {
            throw new Error('User not found')
        }
    }

    getOneByEmail = async (email) => {
        try {
            return await this.dao.getOneByEmail(email)
        } catch (error) {
            throw new Error('User not found')
        }
    }

    update = async (id, user) => {
        try {
            const result = await this.dao.update(id, user);
            return result;
        } catch (error) {
            throw new Error('An error ocurred updating user')
        }
    }

    deleteOne = async (id) => {
        try {
            return await this.dao.deleteOne(id)
        } catch (error) {
            throw new Error('An error ocurred deleting users')
        }
    }
}
