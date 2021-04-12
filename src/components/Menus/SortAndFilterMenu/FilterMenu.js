import React, {useState} from 'react';
import Styled from 'styled-components';

import WallFilter  from './WallFilter';
import PostcodeSort  from './PostcodeSort';

const FilterMenu = () => {
    const [filterMenuVisible, setFilterMenuVisibility] = useState(false)

    function toggleMenuVisibility () {
        setFilterMenuVisibility(!filterMenuVisible)
    }

    return (
        <>
        <BackgroundFade className={filterMenuVisible ? 'visible' : ''} onClick={toggleMenuVisibility}></BackgroundFade>
        <FilterMenuContainer>
            <label className='filter__menu-title' onClick={toggleMenuVisibility}>
                <label className='filter__menu-icon'>
                        <strong>{`${filterMenuVisible ? '-' : '+'}`}</strong>
                </label>
                    <strong>Sort & Filter</strong>
            </label>
            <div data-testid='filter-menu' className={`filter__menu-filter-container ${filterMenuVisible ? 'visible' : ''}`} >
                <div className='filter__menu-filter-item' >
                    <WallFilter />
                </div>
                <div className='filter__menu-filter-item' >
                    <PostcodeSort setFilterMenuVisibility={setFilterMenuVisibility} />
                </div>
            </div>
        </FilterMenuContainer>
        </>
    )
}

export default FilterMenu

const BackgroundFade = Styled.div`
    opacity: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    z-index: -1000;
    position: fixed;
    top: 40px;
    transition: opacity 0.45s ease-in-out;
    visibility: hidden;
    &.visible {
        display: block;
        z-index: 10;
        opacity: 0.8;
        visibility: visible;
        transition: opacity 0.45s ease-in-out;
    }
`

const FilterMenuContainer = Styled.div`
    z-index: 101;
    position: fixed;
    text-align: left;
    display: flex;
    left: 0;
    top: 3.7rem;
    color: white;
    padding-left: 1rem;
    width: 25%;

    .filter__menu-mobile-heading, .filter__menu-icon {
        display: none;
    }
    .filter__menu-title {
        display: flex;
        flex-direction: row;
        text-transform: uppercase;

    }
    
    .filter__menu-icon {
        position: relative;
        left: 0;
        margin-right: 5px;
        font-size: 30px;
        bottom: 11px;
        display: flex;
    }
    .filter__menu-form-heading {
        display: flex;
        padding-left: 20px;
    }
    .filter__menu-filter-container {
        position: absolute;
        transform: translateX(-100vw);
        height: 100vh;
        top: 30px;
        left: -22px;
        padding: 20px;
        background-color: #ffffff;
        color: #282c34;
        min-width: 250px;
        opacity: 0.9;
        transition: transform 0.45s ease-in-out;
        &.visible {
            transform: translateX(0);
            transition: transform 0.45s ease-in-out;
        }

        .filter__menu-filter-item {
            margin-bottom: 15px;
        }
    }

    @media only screen and (max-width: 480px) {
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 5px;
        
        .filter__menu-filter-container {
            width: 50vw;
            left: 0;
            min-width: 200px;
            .filter__menu-filter-item {

                .filter__menu-form-heading {
                    padding-left: 5px;
                }
                form {
                    .filter__menu-checkbox {
                        padding-left: 5px;
                        width: 100%;
                        margin-bottom: 10px;
                    }
                }
                .filter__menu-sort-form {
                    .filter__menu-sort-input {
                        left: 0;
                    }
                    .submit-postcode {
                        right: -158px;
                    }
                }
                .change-post-code-container {
                    padding-left: 5px;
                }
            }
        }
    }
`