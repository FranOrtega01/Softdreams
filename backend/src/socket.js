import productRouter from './routes/products.router.js';
import sessionRouter from './routes/session.router.js'
import contactRouter from './routes/contact.router.js'

const socket = (app) => {
    // Config de rutas
    app.use('/api/products', productRouter);
    app.use('/session', sessionRouter);
    app.use('/send', contactRouter)
}

export default socket;