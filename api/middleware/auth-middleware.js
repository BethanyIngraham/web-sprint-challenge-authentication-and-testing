const User = require('../auth/auth-model');
const bcrypt = require('bcryptjs');

function checkReqBody(req, res, next) {
    const {username, password} = req.body;
    if(!username || !password) {
       next({
        status: 400,
        message: 'username and password required'
       });
    } else {
        next();
    }
}

function validatePayload(req, res, next) { 
    const username = 
        typeof req.body.username === 'string' ? 
        req.body.username.trim() : '';

    const password = 
        typeof req.body.password === 'string' ? 
        req.body.password.trim() : '';

    req.body.username = username;
    req.body.password = password;

    if(
        typeof username !== 'string' ||  
        username === '' ||
        username.length < 5 ||
        username.length > 20
    ) {
        return next({
            status: 422,
            message: 'Please enter a username between 5 and 20 characters'
        });
    }

    if( 
        typeof password !== 'string' ||  
        password === '' ||      
        password.length < 3 ||
        password.length > 12 
    ) {
        return next({
            status: 422,
            message: 'Please enter a password between 3 and 12 characters'
        });
    }
    
    next();
}

async function checkUsernameAvailability(req, res, next) {
    try {
        const {username} = req.body;
        const user = await User.findBy({username: username});
       
        if(user.length > 0) {
            return next({
                status: 422,
                message: 'username taken'
            });
        } 

        req.user = user[0];
        next();

    } catch(err) {
        next(err);
    }
}

async function checkUsernameExists(req, res, next) { 
    try {
        const {username} = req.body;
        const user = await User.findBy({username: username})
       
        if(!user.length) {
            next({
                status: 422,
                message: 'invalid credentials'
            });
        } else {
            next();
        }
    } catch(err) {
        next(err);
    }
}


function checkPasswordMatches(req, res, next) {
    // given hashed password matches hashed password in db
    // if it doesn't match - > error message: "invalid credentials"
    console.log('checking for correct password')
    next()
}

module.exports = {
    checkReqBody,
    validatePayload,
    checkUsernameExists,
    checkUsernameAvailability,
    checkPasswordMatches
}