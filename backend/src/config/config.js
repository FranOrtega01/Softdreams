import dotenv from 'dotenv'

dotenv.config()
export default {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    
    mongoURI: process.env.MONGO_URI,
    mongoDBName: process.env.MONGO_DB_NAME,

    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    jwtCookieName: process.env.JWT_COOKIE_NAME,

    sessionKey: process.env.SESSION_KEY,

    gmailAppKey: process.env.GMAIL_APP_KEY,
    gmailAppEmail: process.env.GMAIL_APP_EMAIL,
    gmailTransport: process.env.GMAIL_TRANSPORT,

    reCaptchaKey: process.env.SECRET_KEY_RECAPTCHA
}