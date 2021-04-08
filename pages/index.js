import React, { useContext, useEffect } from 'react';
import Head from 'next/head'
import Styled from 'styled-components';
import { Dispatch, State } from '../src/store/Store';
import { fetchWalls, filterWalls } from '../src/services/helpers/WallHelpers';
import TopNav from '../src/components/Navigation/TopNav';
import SecondaryNav from '../src/components/Navigation/SecondaryNav';
import WallCard from '../src/components/WallCard';
import FilterMenu from '../src/components/Menus/SortAndFilterMenu';

const Index = () => {
    const { signOut, signUpSuccess, user, userPostCode, walls, filterSelection } = useContext(State)
    const dispatch = useContext(Dispatch)
    useEffect(() => {
        try{
            fetchWalls(dispatch, userPostCode);
        } catch (err) {
            console.log(err)
        }
    }, [userPostCode])

    let sortedWalls
    if (userPostCode) {
        sortedWalls = walls ? walls.sort((a, b) => Number(a.distance) - Number(b.distance)) : {};
    } else {
        sortedWalls = walls ? walls.sort((a, b) => (a.name > b.name) ? 1 : -1) : {};
    }

    const filteredWalls = filterWalls(filterSelection, sortedWalls)

    return (
        <>
            <Head>
                <meta name="description" content="With Clambr you can find information on any of London's many climbing walls. Opening times, contact details, location and user reviews, all in one place." />
                <title>Clambr | Find a climbing wall in London</title>
            </Head>
            <TopNav />
            <SecondaryNav />
            <FilterMenu />
            {userPostCode && (
                <PostcodeDetails>
                    <p>Sorted by distance from <strong>{userPostCode.toUpperCase()}</strong></p>
                </PostcodeDetails>
            )}
            <WallCardOuterContainer postcode={userPostCode}>
                <WallCardInnerContainer>
                    {filteredWalls.length === 0 && (<div>Loading Walls...</div>)}
                    {filteredWalls.length > 0 && filteredWalls.map(wall => 
                        <WallCard wall={wall} key={wall.id} />)}
                    {filteredWalls.length > 0 && (<>
                        <div className='wall-card-placeholder'></div>
                        <div className='wall-card-placeholder'></div>
                    </>)}
                    </WallCardInnerContainer>
            </WallCardOuterContainer>
        </>
    );
};

// Index.getInitialProps = async ({ res }) => ({ ...res.locals });

export default Index;

const WallCardOuterContainer = Styled.div`
    display: flex;
    margin-top: ${({postcode}) => postcode ? '9rem' : '6.5rem'};
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    position: relative;
    height: fit-content;
    width: 100vw;
    min-width: 300px;
`

const WallCardInnerContainer = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    position: relative;
    height: fit-content;
    width: fit-content;
    max-width: 98%;
    margin-right: auto;
    margin-left: auto;

    .wall-card-placeholder {
        min-width: 400px;
        margin: 2px;
        flex-basis: 270px;
        flex-grow: 1;
    }

    @media only screen and (max-width: 974px) {
        max-width: 95%;
        justify-content: center;
    }

    @media only screen and (max-width: 480px) {
        margin-top: 60px;
    }

    &::after {
        content: "";
        flex: auto;
        width: 20%;
    }
`

const PostcodeDetails = Styled.div`
    position: fixed;
    top: 5.5rem;
    width: 100%;
    height: 3rem;
    text-align: center;
    background-color: #d3d3d3;
    z-index: 100;
`
