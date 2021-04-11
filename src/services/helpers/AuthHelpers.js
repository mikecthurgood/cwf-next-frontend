import { handleLogin } from '../api/AuthQueries'

module.exports = {
    async loginHandler (dispatch, event, authData) {
        event.preventDefault();
        const loginResult = await handleLogin(authData)
        if (loginResult.isAuth) {
            dispatch({
                type: 'setUser', 
                data: {
                    username: loginResult.username,
                    userId: loginResult.userId,
                    isAuth: true,
                    token: loginResult.token
                }
            })
            dispatch({type: 'setLoginMenuVisible', data: false})
        } else {
            dispatch({type: 'setLoginError', data: true})
            setTimeout(()=> {
                dispatch({type: 'setLoginError', data: false})
            },500)
        }
    },
}