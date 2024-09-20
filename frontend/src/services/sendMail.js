import config from "../config/config";

export const sendMail = async (data, token) => {
    return await fetch(`${config.backURL}/send/mail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
    });
};

