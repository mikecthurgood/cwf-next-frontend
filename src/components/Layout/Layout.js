/* eslint-disable react/no-danger */
import Head from 'next/head';
import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Content } from '../../store/Store';


const GlobalStyle = createGlobalStyle`

    * {
        ::-webkit-scrollbar {
            width: 0;
        }
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video, input {
        border: 0;
        box-sizing: border-box;
        font-size: 100%;
        font: inherit;
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        text-size-adjust: none;
        vertical-align: baseline;
    }

    html,
    body {
        -webkit-tap-highlight-color: transparent;
        -webkit-overflow-scrolling: touch;
    }

    html {
        touch-action: manipulation;
    }

    .content-scroll {
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

    }

    body {
        background-color: #fff;
        color: #000;
        font-family: Muli, sans-serif;
        
    }

    img {
        display: block;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    h1, h2, h3, h4, h5, strong {
        font-weight: 700;
    }
`;

const Layout = ({ children }) => {

    return (
        <>
            <GlobalStyle />
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="keywords" content="Climbing, Bouldering, Indoor" />
                <meta name="author" content="Mike Thurgood" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />    
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli&display=swap" />
            </Head>
            {children}
        </>
    );
};

export default Layout;
