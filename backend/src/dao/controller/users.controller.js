import { UserService } from '../../repository/index.js'

export const get = async (req, res) => {
    try {
        const user = await UserService.get()
        res.json({status: "success", payload: user });
    } catch (error) {
        return res.json({ status: 'error', error });
    }
}

export const create = async (req, res) => {
    try {
        const data = req.body
        const newUser = await UserService.create(data)

        return res.json({ status: 'success', payload: newUser });
    } catch (error) {
        return res.json({ status: 'error', error });
    }
}

export const getOneByID = async (req, res) => {
    try {
        const { uid } = req.params
        const user = await UserService.getOneByID(uid)

        res.json({status: "success", payload: user });
    } catch (error) {
        return res.json(error)
    }
}

export const getOneByEmail = async (req, res) => {
    try {
        const { email } = req.params
        const user = await UserService.getOneByEmail(email)

        res.json({status: "success", payload: user });
    } catch (error) {
        return res.json(error)
    }
}

export const update = async (req, res) => {
    try {
        const { uid } = req.params
        const data = req.body
        const updatedUser = await UserService.update(uid, data)

        res.json({ status: 'success', payload: updatedUser })
    } catch (error) {
        res.json({ status: 'error', error })
    }
}

export const deleteOne = async (req, res) => {
    const { uid } = req.params
    try {
        const deletedUser = await UserService.deleteOne(uid)

        res.json({ status: 'success', payload: deletedUser })
    } catch (error) {
        res.json({ status: 'error', error })
    }
}



