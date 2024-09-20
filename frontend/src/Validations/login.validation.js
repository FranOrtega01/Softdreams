import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email("El email no es valido").required("Ingrese Email"),
    password: yup.string().required("Ingrese Contraseña"),
})