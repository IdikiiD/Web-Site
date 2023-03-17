const cookie = require('cookie')
const getJwtPublicKey = require('./utils/getJwtPublicKey')
const jwt = require("jsonwebtoken")
const faunadb = require('faunadb')
const { of, from } = require('rxjs')
const { map, switchMap } = require('rxjs/operators')
const formatWMID = require('./utils/formatWMID')

const q = faunadb.query

exports.handler = (event, context) => {

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  }) 

  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)

  return of(cookies).pipe(
    map(cookies=>{
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
    map(getUserResponse=>{
      return {
        statusCode: 200,
        body: JSON.stringify({WMID:formatWMID(getUserResponse.data.WMID),profitInPercent:getUserResponse.data.profit_in_percent})
      }
    })
  ).toPromise().catch(error=>{
    return error.statusCode?error: {
      statusCode: 401,
      body: JSON.stringify()
    }
  })
}