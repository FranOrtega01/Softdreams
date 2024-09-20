import config from '../../config/config.js';

export const login = async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
    }

    try {
        res.cookie(config.jwtCookieName, req.user.token, {
            maxAge: 86400000, // 24 horas
            httpOnly: false,
            sameSite: 'none',
            secure: true,
            path: '/'
        });

        return res.status(200).send({ status: 'success', user: req.user });
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error.message });
    }
};

export const logout = async (req, res) => {
    console.log('Entro al logout');
    try {
        res.clearCookie(config.jwtCookieName, { sameSite: 'none', secure: true, });

        res.send({ status: 'success' })
    } catch (error) {
        console.log(error);
    }
}