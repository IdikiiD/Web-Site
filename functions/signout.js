const {of} = require('rxjs');

exports.handler = async (event, context) => {  
  return of({
    statusCode: 200,
    headers: {
      "Set-Cookie": "jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Logged out successfully" }),
  }).toPromise()
}
