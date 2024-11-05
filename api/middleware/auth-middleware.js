function validatePayload(req, res, next) { 
    // username and password requirements - register
    console.log('validating payload')
    next()
}

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

function checkUsernameExists(req, res, next) { 
    // username must not exist in users table - register
    // if taken -> error message: "username taken"
    console.log('checking if username already exists')
    next()
}

function checkUsernameAvailability(req, res, next) {
    // checks if username does not exist in the db - login
    // if it doesn't -> error message: "invalid credentials"
    console.log('checking if username is free')
    next()
}

function checkPasswordMatches(req, res, next) {
    // given hashed password matches hashed password in db
    // if it doesn't match - > error message: "invalid credentials"
    console.log('checking for correct password')
    next()
}

module.exports = {
    validatePayload,
    checkReqBody,
    checkUsernameExists,
    checkUsernameAvailability,
    checkPasswordMatches
}