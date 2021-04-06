import React, { useEffect } from 'react';
import Head from 'next/head';
import Styled from 'styled-components';
import { useRouter } from 'next/router'

import TopNav from '../../src/components/Navigation/TopNav'

const SingleWall = (props) => {
    const router = useRouter();
    const slug = router.query.wallSlug;

    useEffect(() => {
        console.log(`Single wall page ${slug}`)
    }, [slug])

    return (
        <>
            <Head>
                <meta name="description" content="With Clambr you can find information on any of London's many climbing walls. Opening times, contact details, location and user reviews, all in one place." />
                <title>{`${slug}`} | Replace me with a better title</title>
            </Head>
            <TopNav />
            <h1>Hello Clambr {`${slug}`}</h1>
        </>
    );
};

export default SingleWall;

// const Mobile = styled.div`
//     @media (min-width: 1024px) {
//         display: none;
//     }
// `;

// const Desktop = styled.div`
//     display: none;
    
//     @media (min-width: 1024px) {
//         display: block;
//     }
// `;
