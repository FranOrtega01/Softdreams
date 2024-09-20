import React, { useState, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { contactSchema } from '../../Validations/contact.validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import config from '../../config/config';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { TextInput } from '../TextInput';
import { sendMail } from '../../services/sendMail';

export const ContactForm = ({ ...props }) => {

    const [loading, setLoading] = useState(false)

    const { executeRecaptcha } = useGoogleReCaptcha();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(contactSchema)
    });

    const onSubmit = async (data) => {
        try {
            if (!executeRecaptcha) {
                return;
            }

            setLoading(true);

            const token = await executeRecaptcha()

            if (!token) {
                setLoading(false);
                return;
            }
            
            const response = await sendMail(data, token);
            const json = await response.json();

            notify(json.status, json.message);
            reset();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            notify('error', 'Algo salió mal! Por favor, intentalo más tarde o envía el email manualmente.');
        }
    };

    const notify = (value, message) => {
        if (value === 'success') return toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
            style: {
                fontSize: '18px'
            }
        })
        return toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
            style: {
                fontSize: '18px'
            }
        })
    };

    return (
        <section className={props.className}>
            <h2>Envianos un mensaje</h2>
            <div>
                <form id="contactForm" className="row" onSubmit={handleSubmit(onSubmit)}>

                    <TextInput className={"form-control"} size="col-6" name={'enterprise'} placeholder={'Empresa'} register={register} errors={errors} />

                    <TextInput className={"form-control"} size="col-6" name={'loc'} placeholder={'Localidad'} register={register} errors={errors} />

                    <TextInput className={"form-control"} size="col-6" name={'name'} placeholder={'Nombre'} register={register} errors={errors} />

                    <TextInput className={"form-control"} size="col-6" name={'tel'} placeholder={'Teléfono'} register={register} errors={errors} />

                    <TextInput className={"form-control"} name={'email'} placeholder={'Email'} register={register} errors={errors} />
                    
                    <TextInput className={"form-control"} name={'subject'} placeholder={'Asunto'} register={register} errors={errors} />

                    <TextInput className={"form-control"} textarea name={'msj'} placeholder={'Mensaje'} register={register} errors={errors} />
                    <div className="form-group" id="submit">
                        <input type="submit" className="btn-action" disabled={loading}
                            value={loading ? "Enviando" : "Enviar"}
                        />
                    </div>
                </form>
                <ToastContainer />
            </div>
        </section>
    )
}
