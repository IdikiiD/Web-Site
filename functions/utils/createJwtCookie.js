const getJwtPrivateKey = require('./getJwtPrivateKey')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

module.exports = function createJwtCookie(userId, email) {
    
    const secretKey = getJwtPrivateKey();
    const token = jwt.sign({ userId, email },secretKey, {
        algorithm: "RS256",
        expiresIn: "100 days",
    })
      
        
      
    const jwtCookie = cookie.serialize("jwt", token, {
        secure: false,// process.env.NETLIFY_DEV !== "true",
        httpOnly: true,
        path: "/",
    })
          
    return `${jwtCookie};expires=${new Date(new Date().getTime()+9940900000).toUTCString()}`   
      
 }
 