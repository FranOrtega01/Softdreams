import React, { useEffect } from 'react';

export const TextInput = ({ name, placeholder, errors, register, setValue, value: externalValue, ...props }) => {
    useEffect(() => {
        if (externalValue) {
            setValue(name, externalValue);
        }
    }, [externalValue, setValue, name]);

    return (
        <>
            {props.textarea ?
                <div className={`form-group ${props?.size}`} id={name}>
                    <textarea {...register(name)}
                        className={props.className}
                        name={name} ></textarea>
                    <p className='error'>{errors[name]?.message}</p>
                </div>
                :
                <div className={`form-group ${props?.size}`}>
                    <input
                        onChange={(e) => setValue(name, e.target.value)}
                        className={props.className}
                        {...register(name)}
                        type={props?.type || 'text'}
                        placeholder={placeholder}
                        name={name} id={name}
                    />
                    <p className='error'>{errors[name]?.message}</p>
                </div>
            }
        </>
    )
}

