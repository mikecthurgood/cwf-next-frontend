import React, { useState, useContext } from 'react'
import Styled from 'styled-components';
import { Dispatch, State } from '../../../store/Store';
import AuthForm from '../../Form/Login';

const LoginMenu = () => {
    const { user, loginMenuVisible } = useContext(State)
    const dispatch = useContext(Dispatch)
    const [loginVisible, setLoginVisible] = useState(false)

    function loginMenuToggle () {
        dispatch({type: 'setLoginMenuVisible', data: !loginMenuVisible})
    }
    
    function loginFormToggle () {
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
                    <h5 onClick={loginFormToggle} data-testid='login-form-control'>Login</h5>
                    <AuthFormContainer className={loginVisible ? 'visible' : ''}>
                        <AuthForm layout={'compact'} />
                    </AuthFormContainer>
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

const AuthFormContainer = Styled.div`
    position: relative;
    max-height: 0px;
    overflow-y: hidden;
    transition: max-height 0.25s ease-out; 
    width: 100%;
    &.visible {
        max-height: 300px;
        transition: max-height 0.45s ease-in; 
    }

`