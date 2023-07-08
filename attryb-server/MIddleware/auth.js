const jwt = require('jsonwebtoken');
const  Dealer  = require('../models/Dealer_inventer')
const config = require('../config');

async function middleware(req, res, next) {
    const authorization = req.headers['authorization'];

    if (authorization) {

        // validate the tokena

        const token = authorization.split(' ').pop();
        
        if(token) {

            try {
                jwt.verify(token, config.Secret_key);
    
                let user = jwt.decode(token);
    
                user = await Dealer.findById(user._id);
    
                user = user.toJSON();
                console.log(user)
                delete user.password;
    
                // Modify the request object to contain the authenticated user
                req.user = user;
    
                next();
            } catch(err) {
                return res.status(401).send({
                    message: 'Invalid token provided'
                })
            }

        } else {
            return res.status(401).send({
                message: 'No auth token present'
            })
        }

    } else {
        return res.status(401).send({
            message: 'User is not logged in'
        })
    }
}

module.exports = middleware;