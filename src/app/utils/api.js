
const SuccessResponseCode = 200

const signup = (data) => {
  return fetch('/.netlify/functions/signup', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    if(response.status===SuccessResponseCode){
      return response.json()
    }else{
      throw response
    } 
  })
}

const signin = (data) => { 
  return fetch('/.netlify/functions/signin', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    if(response.status===SuccessResponseCode){
      return response.json()
    }else{
      throw response
    }    
  })
}

const getUserById = (userId) => {
  return fetch(`/.netlify/functions/get-user-by-id/${userId}`).then(response => {
    if(response.status===SuccessResponseCode){
      return response.json()
    }else{
      throw response
    } 
  })
}

const getLoggedUser = () => {
  return fetch(`/.netlify/functions/get-logged-user/`).then(response => {
    if(response.status===SuccessResponseCode){
      return response.json()
    }else{
      throw response
    } 
  })
}

const createTransaction = (data) => {
  return fetch('/.netlify/functions/create-transaction', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    if(response.status===SuccessResponseCode){
      return response.json()
    }else{
      throw response
    } 
  })
}

const addMessage = (data) => {
  return fetch('/.netlify/functions/add-message', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    if(response.status===SuccessResponseCode){
      return response
    }else{
      throw response
    } 
  })
}

const signout = (data) => {
  return fetch('/.netlify/functions/signout').then(response => {
    return response.json()
  })
}
const apiInterface={
  signup,
  signin,
  signout,
  getLoggedUser,
  getUserById,
  createTransaction,
  addMessage
}

export default apiInterface
