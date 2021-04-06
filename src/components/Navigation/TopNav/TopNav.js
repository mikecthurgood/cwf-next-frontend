import React, { useContext } from 'react';
import Styled from 'styled-components';
import Link from 'next/link'

import { Dispatch, State } from '../../../store/Store'
import AuthForm from '../../Form/Login'

const TopNav = () => {

    const { loginError, user, loginMenuVisible } = useContext(State)
    const dispatch = useContext(Dispatch)

    function loginMenuToggle () {
        dispatch({type: 'setLoginMenuVisible', data: !loginMenuVisible})
    }

    return (
        <NavBar>
            <Link href='/'>
              <a><MainLogo src='/clambr_logo_blue.png' alt="clambr logo" id='main-logo' /></a>
            </Link>
            {!user.username ?
            <>
                 <LoginControls>
                    <AuthForm />
                 </LoginControls>
            </>
                :
                <div className="navbar-account-details"><p onClick={loginMenuToggle} className='nav-username'>Hi {user.username}!</p></div>
            }
{/* 
            <div className={`login-menu ${user.username ? 'logged-in' : '' }`}>
                <img onClick={loginMenuToggle} src='/login-icon.jpg' alt="" />
            </div> */}
        </NavBar >
    )
}

export default TopNav

const NavBar = Styled.div`
    height: 50px;
    background-color: #282c34;
    position: fixed;
    display: flex;
    justify-content: space-between;
    top: 0;
    width: 100%;
    z-index: 1000;
        @media only screen and (max-width: 566px) {
          flex-direction: column;
          justify-content: center;
        }

      /* .hamburger-menu {
        display: none;

        @media only screen and (max-width: 566px) {
          display: flex;
          position: absolute;
          left: 10px;
          img {
            width: 25px;
          }
          
        }
      }

      .login-menu {
        display: none;
        position: absolute;
        right: 10px;
        top: 12px;
        img {
          width: 25px;
          height: 26.16px;
        }
        
        &.logged-in {
          display: flex;
        }

        @media only screen and (max-width: 566px) {
          display: flex;
          position: absolute;
          // &.logged-in {
          //   display: none;
          //   overflow: hidden;

            img {
              // display: none;
            }
          // }
    } */
`

const MainLogo = Styled.img`
  position: relative;
  margin-right: 2rem;
  width: 100%;
  max-width: 10rem;
  object-fit: contain;
  left: 0.5rem;
  top: 0.5rem;
`

const LoginControls = Styled.div`
  position: relative;
  right: 0.5rem;
`


