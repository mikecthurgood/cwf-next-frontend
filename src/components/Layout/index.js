import React, { useEffect, useContext } from 'react';
import checkUserData from './initialChecks'
import Layout from './Layout'
import { Dispatch } from '../../store/Store'

const LayoutContainer = ({ children }) => {
    const dispatch = useContext(Dispatch)
    useEffect(() => {
        checkUserData(dispatch)
    }, [])

    return (
        <Layout>
            {children}
        </Layout>
    );
};

export default LayoutContainer;
