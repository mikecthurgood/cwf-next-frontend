import React, { useContext } from 'react';
import Styled from 'styled-components';
import Link from 'next/link'

import { Dispatch, State } from '../../../store/Store';
import AuthForm from '../../Form/Login';
import LoginMenu from '../../Menus/LoginMenu';

const TopNav = () => {

    const { user, loginMenuVisible } = useContext(State)
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
            <LoginControls>
              <Desktop>
                <AuthForm />
              </Desktop>
              <Mobile >
                <img onClick={loginMenuToggle} src='/login-icon.jpg' alt="" data-testid='login-menu-toggle' />
              </Mobile>
            </LoginControls>
            :
            <LoggedInDetails>
                <p onClick={loginMenuToggle} className='nav-username'>
                  Hi {user.username}!
                </p>
                <img onClick={loginMenuToggle} src='/login-icon.jpg' alt="" data-testid='user-icon' />
            </LoggedInDetails>
          }
          <LoginMenu />
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

const LoggedInDetails = Styled.div`
    color: white;
    display: flex;
    justify-content: flex-end;
    z-index: 1001;
    background-color: #282c34;

    img {
      height: 50%;
      margin: auto 1rem;
    }

    img, p {
      cursor: pointer;
    }
`

const Desktop = Styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`

const Mobile = Styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  img {
      height: 50%;
      margin: auto 1rem;
      float: right;
      z-index: 1001;

    }

@media (min-width: 768px) {
  display: none;
}
`


