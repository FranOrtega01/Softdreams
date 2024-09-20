import { ProductService } from '../../repository/index.js';
import { deleteImgsFromFolder } from '../../services/imgServices.js';
import fs from 'fs';
import { compressAndUploadFiles } from '../../services/imgServices.js'

export const get = async (req, res) => {
    try {
        const products = await ProductService.get()
        res.json({ status: "success", payload: products })
    } catch (e) {
        res.json({
            status: "error",
            message: e
        })
    }
}

export const getOneByID = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await ProductService.getOneByID(pid)
        res.json({ status: "success", payload: product })
    } catch (error) {
        res.json({
            status: "error",
            message: 'Product not found'
        })
    }
}

export const getOneByModel = async (req, res) => {
    try {
        const { model } = req.params;
        const product = await ProductService.getOneByModel(model)
        res.json({ status: "success", payload: product })
    } catch (error) {
        res.json({
            status: "error",
            message: 'Product not found'
        })
    }
}

export const create = async (req, res) => {
    try {
        const product = req.body;

        if (!req?.body?.modelo) return res.status(400).json({ status: 'error', message: 'Por favor, completa los campos obligatorios.' })

        console.log(req.files);

        if (!req?.files) return res.status(400).json({ status: 'error', message: 'Por favor, carga los archivos obligatorios.' })
        
        compressAndUploadFiles(req.files, product.id);

        if (await ProductService.getOneByModel(product?.modelo)) {
            return res.status(400).json({
                status: 'error',
                message: `Ya existe un producto con el nombre ${product?.modelo}.`,
            });
        }
        console.log(req.files);

        product.thumbnails = req.files.map(file => `/img/products/${req?.body?.id}/${file.filename}`);
        console.log(product);

        const newProduct = await ProductService.create(product)
        res.json({
            status: "success",
            payload: newProduct
        })
    } catch (e) {
        console.log("error: ", e);
        res.json({
            status: 'error',
            e
        })
    }
}

export const update = async (req, res) => {
    console.log("entro");

    console.log(req.body);
    // console.log("Files: ", req?.files)

    // console.log("NewOrder: ", req.body?.newOrder)

    try {

        const { model } = req.params
        const newOrder = req.body?.newOrder.split(",")
        deleteImgsFromFolder(req.body?.id, newOrder);
        console.log("CONTROLLER: ", req.files);
        console.log("CONTROLLER: ",req.body.id );

        
        compressAndUploadFiles(req.files, req.body.id);
        const productToUpdate = req.body
        productToUpdate.thumbnails = newOrder.map(img => `/img/products/${req?.body?.id}/${img}`);

        const update = await ProductService.update(model, productToUpdate)
        res.json({
            status: "success",
            payload: 'update'
        })
    } catch (error) {
        res.json({
            status: "error",
            message: error
        })
    }
}

export const deleteOne = async (req, res) => {
    try {
        const { pid } = req.params
        const user = req.user?.user

        // if (!user) throw new Error("Unauthorized");

        const deleted = await ProductService.deleteOne(pid)

        res.json({
            status: "success",
            payload: deleted
        })
    } catch (error) {
        res.json({
            status: "error",
            message: error
        })
    }
}

export const deleteAll = async (req, res) => {
    try {
        const deleted = await ProductService.deleteAll();
        res.json({
            status: "success",
            payload: deleted
        })
    } catch (error) {
        res.json({
            status: "error",
            message: error
        })
    }
}


