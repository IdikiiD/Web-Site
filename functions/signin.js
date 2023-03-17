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
  
  const {captchaResponse,...credentials} = JSON.parse(event.body)  

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
    switchMap(_=>from(client.query(q.Get(q.Match(q.Index("users_by_WMID"), credentials.WMID))))),
    map(requestResult=>{
      if(requestResult.ref?.id){
        return {
          ...requestResult
        }
      }else{
        throw {
          statusCode: 400,              
          body: {message:'User doesn\'t exist'}
        }
      }
    }),
    switchMap(userData=>{
      return from(bcrypt.compare(credentials.password, userData.data.password)).pipe(
        map(compareResult=>{
          if(compareResult){
            const WMID=formatWMID(userData.data.WMID)
            console.log(WMID)
            return {
              statusCode: 200,
              headers: {
                "Set-Cookie": createJwtCookie(userData.ref.id, userData.data.email),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({WMID, profitInPercent:userData.data.profit_in_percent})
            }
          }else{
            throw {
              statusCode: 401,              
              body: {message:'Not valid credentials'}
            }
          }
        })
      )
    })      
  ).toPromise().catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    }   
  )
}