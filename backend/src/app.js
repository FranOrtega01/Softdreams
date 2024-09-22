import express from 'express';
import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js';

import session from 'express-session';
import passport from 'passport';

import cors from 'cors';
import config from './config/config.js';

import __dirname from './utils.js';
import socket from './socket.js'

const PORT = config.port || 8080;

// Init Servers
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Config Session
app.use(session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: true,
}));

// Cors Config
const corsOptions = {
    origin: ["https://illustrious-mooncake-a8026e.netlify.app", "https://illustrious-mooncake-a8026e.netlify.app/", "illustrious-mooncake-a8026e.netlify.app/"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');  // Allow your front-end origin
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cors(corsOptions));

// Passport Middlewares Config
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, () => console.log('Listening en el puerto ' + PORT));
socket(app);

