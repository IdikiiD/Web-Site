const faunadb = require('faunadb')
const bcrypt = require("bcrypt");
const axios = require('axios');
const {from, catchError, of} = require('rxjs');
const {switchMap, map} = require('rxjs/operators');
const getSecretKey = require('./utils/getSecretKey')
const createJwtCookie = require('./utils/createJwtCookie')
const formatWMID = require('./utils/formatWMID')
const q = faunadb.query

exports.handler = async (event, context) => {  
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })    
  const {captchaResponse,...userData} = JSON.parse(event.body)  

  const captchaData = {secret:getSecretKey(), response: captchaResponse}
        
  return from(axios({
    method: 'post',
    url: 'https://www.google.com/recaptcha/api/siteverify',
    params:captchaData
  })).pipe(
    map(recaptchaResponse=>{
      if(!recaptchaResponse.data.success){
        throw {
          statusCode: 400,              
          body: {message:'Captcha is not valid"'}
        }
      }
      return true
    }),
    switchMap(_=>{
         return from(client.query(q.Get(q.Match(q.Index("users_by_WMID"), userData.WMID)))).pipe(
           map(_=>{             
            throw {
              statusCode: 400,              
              body: {message:'Stellar Address allready exists'}
            }
           }),
           catchError(error=>{
              if(error.requestResult?.statusCode===404){
                return of(true)
              }
              throw error
            })
         )
      }
    ),
    switchMap(_=>{
         return from(client.query(q.Get(q.Match(q.Index("users_by_email"), userData.email)))).pipe(
           map(_=>{             
            throw {
              statusCode: 400,              
              body: {message:'Email allready exists'}
            }
           }),
           catchError(error=>{
              if(error.requestResult?.statusCode===404){
                return of(true)
              }
              throw error
            })
         )
      }
    ), 
    switchMap(_=>from(bcrypt.hash(userData.password, 10))),
    switchMap(password=>from(client.query(q.Create(q.Ref('classes/users'), {
      data:{
        ...userData,
        password,
        profit_in_percent:0,
        activated: false
      }
    })))),
    map(createNewUserResponse=>{
      return {
        statusCode: 200,
        headers: {
          "Set-Cookie": createJwtCookie(createNewUserResponse.ref.id, createNewUserResponse.data.email),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({WMID:formatWMID(createNewUserResponse.data.WMID), profitInPercent:createNewUserResponse.data.profit_in_percent})
        }
      } 
    )  
  ).toPromise().catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    }   
  )
}
