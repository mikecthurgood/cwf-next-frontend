import React, { useContext } from 'react';
import Styled from 'styled-components';
// import { Dispatch, State } from '../../context/Store'
// import { Link } from 'react-router-dom';
// import AuthForm from '../form/AuthForm'

const SecondaryNav = ({slug, loginHandler, signupHandler}) => {

    // const { loginError, user, loginMenuVisible } = useContext(State)
    // const dispatch = useContext(Dispatch)
    function loginMenuToggle () {
        dispatch({type: 'setLoginMenuVisible', data: !loginMenuVisible})
    }

    return (
        !slug && (<NavBar>
            {/* <Link to="/"><img src={require('../../assets/clambr_logo_blue.png')} alt="clambr logo" id='main-logo' /></Link>
            {!user.username ?
            <>
                 <div className='login-dropdown'>
                    <AuthForm 
                    loginError={loginError} 
                    onSubmit={loginHandler} 
                    signup={false} 
                    user={user}
                    loginToggle={() => {}}
                    mobileMenuToggle={() => {}}
                    loginMenuToggle={() => {}}
                    loginHandler={loginHandler}
                    signupHandler={signupHandler}
                />
                 </div>
            </>
                :
                <div className="navbar-account-details"><p onClick={loginMenuToggle} className='nav-username'>Hi {user.username}!</p></div>
            }

            <div className={`login-menu ${user.username ? 'logged-in' : '' }`}>
                <img onClick={loginMenuToggle} src={require('../../assets/login-icon.jpg')} alt="" />
            </div> */}
        </NavBar >)
    )
}

export default SecondaryNav

const NavBar = Styled.div`
      position: fixed;
      top: 0;
      width: 100%;
      text-align: right;
      padding: 0;
      top: 50px;
      height: 40px;
      z-index: 100;
      background-color: #ED5656;
`


