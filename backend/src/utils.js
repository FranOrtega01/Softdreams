import passport from 'passport';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import config from './config/config.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'

export default __dirname;

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// Check if password is valid
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

// Cookies Token Extract
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[config.jwtCookieName] : null
}

// Rol authorization
export const authorization = (role) => {
    return async (req, res, next) => {
        const user = req.user?.user;
        if (!user) return res.status(401).send({ status: 'error', error: "Unauthorized" });
        if (!role.includes(user.role)) return res.status(403).send({ status: 'error', error: 'No Permission' })
        next();
    }
}

// Passport
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ status: 'error', error: info.messages ? info.messages : info.toString() })
            };
            req.user = user;
            next();
        })(req, res, next)
    }
}

export const generateUserToken = (user, time) => {
    const token = jwt.sign({ user }, config.jwtPrivateKey, { expiresIn: time })
    return token
}

// Transport Email (gmail)
export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAppEmail,
        pass: config.gmailAppKey,
    }
})