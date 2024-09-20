import multer from 'multer'
import __dirname from '../utils.js'

// Sharp Config
const storage = multer.memoryStorage();

export const fileUploader = multer({ storage })