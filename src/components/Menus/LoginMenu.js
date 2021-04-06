import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Dispatch, State } from '../../context/Store';
import './loginMenu.scss'

const AuthForm = React.lazy(() => import('../form/AuthForm'))

const LoginMenu = ({loginHandler, signupHandler}) => {
    const { loginError, loginMenuToggle, user, loginMenuVisible } = useContext(State)
    const dispatch = useContext(Dispatch)
    const [loginVisible, setLoginVisible] = useState(false)

    function loginToggle () {
        setLoginVisible(!loginVisible)
    }

    function signOut () {
        dispatch({type: 'signOut'})
    }

    return (
        <div className={`login__menu-container ${loginMenuVisible ? 'visible' : ''} ${user.username ? '' : 'logged-out'}`}>
            <div className='login__menu-login-register'>
                {user && user.username ? 
                <h5 onClick={signOut}>Log out</h5>
                :
                (<>
                    <h5 onClick={loginToggle}>Login</h5>
                    <div className={`login__menu-auth__form ${loginVisible ? 'visible' : ''}`}>
                        <AuthForm 
                            loginError={loginError}
                            signup={false} 
                            hideRegisterButton={true}
                            user={false}
                            loginToggle={loginToggle}
                            LoginMenuToggle={loginMenuToggle}
                            loginHandler={loginHandler}
                            signupHandler={signupHandler}
                        />
                    </div>
                    <Link to='/signup'><h5 onClick={loginMenuToggle}>Register</h5></Link>
                </>)
                }
            </div>
        </div>
    )
}

export default LoginMenu