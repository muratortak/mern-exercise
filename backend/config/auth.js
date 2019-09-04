const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }

    return null;
}

exports.auth = {
    jwt({
        secret = process.env.key,
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    })
};