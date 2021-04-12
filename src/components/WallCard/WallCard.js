import React from 'react';
import StarRatings from 'react-star-ratings';
import Link from 'next/link';
import Styled from 'styled-components';

const WallCard = ({ wall }) => (
    <Card>
        <Link href={`/walls/${wall.slug}`}><a>
            <Heading>
                <h5>{wall.name}</h5>
                {wall.distance && <h4>({wall.distance} miles)</h4>}
            </Heading>
            <ImageContainer>
                <picture className='wall-image'>
                    <source srcSet={wall.imageUrl} type='image/webp'></source>
                    <source srcSet={wall.imageUrl.replace('webp', 'jpg').replace('/climbing-walls', '/climbing-walls/jpegs')} type='image/jpeg'></source>
                    <img src={wall.imageUrl.replace('webp', 'jpg').replace('/climbing-walls', '/climbing-walls/jpegs')} className='wall-image' alt="" />
                </picture>
            </ImageContainer>
            <Content>
                <div className='wall-details-1'>
                    <p><strong>Location:</strong> {wall.region}</p>
                    <><strong>User Rating:</strong><br />
                        {wall.reviews && wall.reviews.length > 0 ?
                            <StarRatings
                                rating={wall.reviews.reduce((prev, cur) => { return prev + cur.rating }, 0) / wall.reviews.length}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="0px"
                            />
                            :
                            'No ratings yet'}</>
                    <strong>{wall.boulderingOnly && <p style={{ color: 'red' }}>Bouldering Only</p>}</strong>
                </div>
                <div className='wall-details-2'>

                    <p><strong>Weekdays:</strong><br />
                        Open: {wall.weekdayOpening}<br />
                        Close: {wall.weekdayClosing}</p>
                    <p><strong>Weekends:</strong><br />
                        Open: {wall.weekendOpening}<br />Close: {wall.weekendClosing}</p>
                </div>
            </Content>
            <Btn>View Details and Reviews</Btn>
        </a></Link>
    </Card>
)

export default WallCard

const Card = Styled.div`
    flex: 1;
    flex-grow: 1;
    flex-basis: 270px;
    height: 100%;
    min-width: 400px;
    margin: 2px;
    border-radius: 2px;
    border-style: solid;
    border-color: #f5f5f5;
    border-width: 0.04em;
    text-align: center;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.5s;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    color: #282c34;
    text-decoration: none;
    cursor: default;

    @media only screen and (max-width: 480px) {
      min-width: 100vw;
      border-radius: 0;
    }

    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.8);
    }
`

const Heading = Styled.div`
    color: #282c34;
    border-width: 0em;
    border-bottom: 0.04em;
    border-color: lightgray;
    border-style: solid;
    padding: 10px 0;
    h4 {
        padding: 0;
        margin: 0;
        color: #ED5656;
    }
    h5 {
        font-size: 16px;
        margin: 0;
        text-decoration: none;

        @media only screen and (max-width: 480px) {
            font-size: 20px;
        }
    }
`

const ImageContainer = Styled.div`
    width: 100%;
    height: 250px;
    
    .wall-image {
        height: 100%;
        min-width: 100%;

        img {
            width: 100%;
            object-fit: cover;
        }
    }
`
const Content = Styled.div`
    text-align: left;
    font-size: 14px;
    width: 100%;  
    position: relative;
    height: 155px;

    @media only screen and (max-width: 480px) {
        font-size: 16px;
    }

    .wall-details-1 {
        width: fit-content;
        position: relative;
        float: left;
        padding-left: 10px; 
        @media only screen and (max-width: 480px) {
            width: 45%;
        }
    }

    .wall-details-2 {
        width: 100px;
        position: relative;
        float: right;
        padding-right: 10px;
        @media only screen and (max-width: 480px) {
            width: 45%;
            text-align: right; 
        }
    }
`

const Btn = Styled.button`
    padding: 5px 30px;
    border-radius: 2px;
    background-color: #ED5656;
    color: white;
    font-size: 14px;
    width: 100%;
    font-family: 'Muli', sans-serif;
    @media only screen and (max-width: 974px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 20px;
    }

    &:focus {
        outline:0;
    }

    &:hover {
        background-color: rgb(179, 64, 64);
    }
`