import React, { useEffect } from 'react';
import checkUserData from './initialChecks'
import Layout from './Layout'

const LayoutContainer = ({ children }) => {
    useEffect(() => {
        checkUserData()
    }, [])

    return (
        <Layout>
            {children}
        </Layout>
    );
};

export default LayoutContainer;
