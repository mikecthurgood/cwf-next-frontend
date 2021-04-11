module.exports = {
    async loginHandler (dispatch, event, authData) {
        console.log({authData})
        const promise = new Promise((resolve, reject) => {
            if(authData.submitData.email === 'failme') {
                resolve ({ 
                    error: 'test error',
                })
            } else {
                dispatch({type: 'loginHandlerDispatchTest', data: authData})
                resolve ('login success')
            }
        })
        return promise
    }
};