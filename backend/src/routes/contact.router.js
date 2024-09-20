import { Router } from 'express';
import { transport } from '../utils.js'
import config from '../config/config.js'
import fetch from 'node-fetch';

const router = Router()

router.post('/mail', async (req, res) => {

    try {
        const { name, email, tel, loc, subject, msj } = req.body


        let emptyFields = [];
        if (!name) {
            emptyFields.push('name')
        }
        if (!email) {
            emptyFields.push('email')
        }
        if (!tel) {
            emptyFields.push('tel')
        }
        if (!loc) {
            emptyFields.push('loc')
        }
        if (!subject) {
            emptyFields.push('subject')
        }
        if (!msj) {
            emptyFields.push('msj')
        }
        if (emptyFields?.length > 0) return res.status(400).json({ status: 'error', message: 'Please fill in all the fields.' })


        const html = `
            <h2>Email de prueba</h2>
            <p><b>Nombre: </b> ${name} </p>
            <p><b>Email: </b> ${email} </p>
            <p><b>Numero: </b> ${tel} </p>
            <p><b>Empresa: </b> ${loc} </p>
            <p><b>Mensaje: </b> ${msj} </p>
        `
        
        const result = await transport.sendMail({
            from: config.gmailAppEmail,
            to: config.gmailTransport,
            subject: subject,
            html
        })
        return res.status(200).json({ status: "success", message: "Mensaje enviado" })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Algo salió mal! Por favor, intentalo más tarde o enviá el mail manualmente."})
    }
})

router.post("/verify-recaptcha", (req, res) => {
    const token = req.body.token;

    // Realizar una solicitud POST a la API de verificación de reCAPTCHA de Google
    fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${config.reCaptchaKey}&response=${token}`,
    })
        .then((response) => response.json())
        .then((data) => {
            const { success } = data;

            if (success) {
                res.status(200).send({ status:'success'});
            } else {
                res.status(400).json({status:'error', error: "Error de verificación de reCAPTCHA" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Error del servidor" });
        });
});
export default router