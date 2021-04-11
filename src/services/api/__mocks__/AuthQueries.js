export const handleLogin = (authData) => {
  const promise = new Promise((resolve, reject) => {
    if (authData.email !== 'failme') {
      resolve ({
        isAuth: true,
        token: 123456789,
        userId: 123,
        username: 'Steve Rogers'
      });
    } else {
      resolve ({
        isAuth: false,
        token: null,
        userId: '',
        username: ''
      });
    }
  })
  return promise
}

export const handleSignup = async (authData) => {
  const promise = new Promise( async (resolve, reject) => {
    resolve({
      isAuth: true,
      authLoading: false,
      error: [],
      signupSuccess: true
    })
  })
  return promise
}