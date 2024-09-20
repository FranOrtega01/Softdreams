import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
import { createHash, isValidPassword, generateUserToken, extractCookie } from "../utils.js";
import { UserService } from '../repository/index.js'
import config from './config.js'

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const JWTExtract = jwt.ExtractJwt

const initializePassport = () => {
    // Estrategia para register
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
        async (req, username, password, done) => {
            // Datos del form
            try {
                let { name, email, role } = req.body
                // Buscar un user con ese email, Si existe return 
                const user = await UserService.getOneByEmail(username)
                if (user) {
                    return done(null, false) // (null) No hay ningun error pero, (false) el usuario ya existe.
                }
                // Crea el user con el hash
                const newUser = {
                    name,
                    email: email.toLowerCase(),
                    password: createHash(password),
                    role
                }
                const result = await UserService.create(newUser)
                console.log(result);
                return done(null, result)
            } catch (error) {
                return done('Error al obtener user ' + error)
            }
        }))

    //Estrategia para login
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done) => {
        try {
            const user = await UserService.getOneByEmail(username.toLowerCase());

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            if (!isValidPassword(user, password)) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            const token = generateUserToken(user, '24h');
            user.token = token;
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Estrategia para current con JWT
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([extractCookie]),
        secretOrKey: config.jwtPrivateKey,
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserService.getOneByID(id)
        done(null, user)
    })
}

export default initializePassport