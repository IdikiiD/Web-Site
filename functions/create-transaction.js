/* Import faunaDB sdk */
const faunadb = require('faunadb')
const bcrypt = require("bcrypt");
const axios = require('axios');
const {from, catchError, of} = require('rxjs');
const {switchMap, map} = require('rxjs/operators');
const getSecretKey = require('./utils/getSecretKey')
const getJwtPublicKey = require('./utils/getJwtPublicKey')
const jwt = require("jsonwebtoken")
const cookie = require('cookie')
const q = faunadb.query

exports.handler = async (event, context) => {
  
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })  

  const {captchaResponse,...transaction} = JSON.parse(event.body)  

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
    map(_=>{
      const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
      if (!cookies || !cookies.jwt) {        
        throw {
          statusCode: 401,
          body: JSON.stringify({
            message: "There is no jwt cookie, so the request is unauthorized",
          }),
        }
      }else{
        return jwt.verify(cookies.jwt, getJwtPublicKey())   
      }
    }),
    switchMap(payload=>from(client.query(q.Get(q.Ref(`classes/users/${payload.userId}`))))),
    map(requestResult=>{
      if(requestResult.ref?.id){
        return requestResult.ref.id
      }else{
        throw {
          statusCode: 400,              
          body: {message:'User doesn\'t exist'}
        }
      }
    }),
    switchMap(userId=>{
      return from(client.query(q.Create(q.Ref('classes/transactions'), {
        data: {
          transactionId: transaction.transactionId,
          userId,
          verified: false
        }
      }))).pipe(
        map(createTransactionResponse=>{         
          return {
            statusCode: 200,
            body: JSON.stringify(createTransactionResponse)
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
  
  // /* parse the string body into a useable JS object */
  // const transaction = JSON.parse(event.body)
  // console.log('Function `transactions` invoked', transaction)
  
  // /* construct the fauna query */

  // return client.query(q.Get(q.Match(q.Index("users_by_WMID"), transaction.WMID))) .then((response) => {
    
  //   return client.query(q.Create(q.Ref('classes/transactions'), {
  //     data: {
  //       transactionId: transaction.transactionId,
  //       userId: response.ref.id,
  //       verified: false
  //     }
  //   }))
  //   .then((response) => {
  //     console.log('success', response)
  //     /* Success! return the response with statusCode 200 */
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify(response)
  //     }
  //   }).catch((error) => {
  //     console.log('error', error)
  //     /* Error! return the error with statusCode 400 */
  //     return {
  //       statusCode: 400,
  //       body: JSON.stringify(error)
  //     }
  //   })
  // })  
}
