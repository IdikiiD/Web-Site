/* Import faunaDB sdk */
const faunadb = require('faunadb')
const axios = require('axios');
const {from, catchError, of} = require('rxjs');
const {switchMap, map} = require('rxjs/operators');
const getSecretKey = require('./utils/getSecretKey')
const q = faunadb.query

exports.handler = async (event, context) => {
  
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })  

  const {captchaResponse,...message} = JSON.parse(event.body)  

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
    switchMap(()=>{
      return from(client.query(q.Create(q.Ref('classes/messages'), {
        data: {
          first_name: message.firstName,
          last_name: message.lastName,
          email: message.email,
          message: message.message
        }
      }))).pipe(
        map(createMessage=>{         
          return {
            statusCode: 200,
            body: "OK"
          }
        })
      )
    })      
  ).toPromise().catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    }   
  )   
}
