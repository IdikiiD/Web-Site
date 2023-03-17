const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query

exports.handler = (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  }) 
  const id = getId(event.path)
  return client.query(q.Get(q.Ref(`classes/users/${id}`)))
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}