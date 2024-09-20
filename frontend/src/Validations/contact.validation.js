import * as yup from 'yup'

export const contactSchema = yup.object().shape({
    enterprise: yup.string(),
    name: yup.string().required("Ingrese un nombre"),
    tel: yup.string().required("Ingrese un número de teléfono"),
    loc: yup.string().required("Ingrese un localidad"),
    email: yup.string().email("El email no es valido").required("Ingrese un email"),
    subject: yup.string().required("Ingrese un asunto"),
    msj:  yup.string().required("Ingrese un mensaje"),
})