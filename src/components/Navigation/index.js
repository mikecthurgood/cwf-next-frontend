import React from 'react';
import TopNav from './TopNav';
import SecondaryNav from './SecondaryNav';

const Navigation = ({slug}) => {
    return(
        <>
            <TopNav />
            <SecondaryNav slug={slug} />
        </>
    )
}

export default Navigation;