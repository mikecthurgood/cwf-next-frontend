import React, { useContext } from 'react';
import Styled from 'styled-components';

const SecondaryNav = ({ slug }) => {

    return (
        !slug && (<NavBar>

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


