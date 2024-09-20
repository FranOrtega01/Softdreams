import * as yup from 'yup'

export const prodSchema = yup.object().shape({
    modelo: yup.string().required("El modelo es obligatorio"),
    medidas: yup.string(),
    id: yup.string(),
    nucleo: yup.string(),
    tela: yup.string(),
    altura: yup.string(),
    peso: yup.string(),
    garantia: yup.string(),
})