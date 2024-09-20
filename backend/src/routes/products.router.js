import { Router } from 'express';
import {get , update, create,deleteOne,deleteAll, getOneByID, getOneByModel} from '../dao/controller/products.controller.js';
import { fileUploader } from '../config/multer.js';
import { passportCall, authorization } from '../utils.js';

const r = Router();

r.get('/', get);

r.get('/:model', getOneByModel)

r.post('/', passportCall('jwt'), authorization(["admin"]), fileUploader.any(), create);

r.put('/:model',passportCall('jwt'), authorization(["admin"]), fileUploader.any(),update );

r.delete("/:pid",passportCall('jwt'), authorization(["admin"]), deleteOne);

r.delete('/', passportCall('jwt'), authorization(["admin"]), deleteAll);

export default r;