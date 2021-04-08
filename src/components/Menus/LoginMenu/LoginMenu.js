import React, { useState, useContext } from 'react'
import Styled from 'styled-components';
import { Dispatch, State } from '../../../store/Store';
import AuthForm from '../../Form/Login';

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
        <LoginMenuContainer className={`${loginMenuVisible ? 'visible' : ''} ${user.username ? '' : 'logged-out'}`}>
            <div className='login__menu-login-register'>
                {user && user.username ? 
                <h5 onClick={signOut}>Log out</h5>
                :
                (<>
                    <h5 onClick={loginToggle}>Login</h5>
                    <div className={`login__menu-auth__form ${loginVisible ? 'visible' : ''}`}>
                        <AuthForm layout={'compact'} />
                    </div>
                    <a href='/signup'><h5 onClick={loginMenuToggle}>Register</h5></a>
                </>)
                }
            </div>
        </LoginMenuContainer>
    )
}

export default LoginMenu

const LoginMenuContainer = Styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    z-index: 999;
    width: 50%;
    max-width: 220px;
    background-color: #282c34;
    color: white;
    padding: 44px 20px 20px 20px;
    opacity: 0.95;
    font-size: 16px;
    overflow-y: hidden;
    transform: translateY(-300px);
    transition: transform 0.45s ease-out; 
    &.visible {
        transform: translateY(0px);
        transition: transform 0.45s ease-out; 
    }

    h5, Link, a {
        padding: 0;
        margin: 20px 0 0 0;
        font-size: 16px;
        text-align: left;
        color: white;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
    }

.login__menu-login-register {
    width: 100%;
}

@media (min-width: 768px) {
  display: none;
}
`