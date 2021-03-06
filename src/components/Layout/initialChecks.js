export default function checkUserData (dispatch) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('userName')
    const postcode = localStorage.getItem('userPostcode')
    if (postcode) dispatch({ type: 'setPostcode', data: postcode })
    if (!token) {
        return;
    }
    dispatch({ type: 'setUser', data: {username, userId, token, isAuth: true} })
};