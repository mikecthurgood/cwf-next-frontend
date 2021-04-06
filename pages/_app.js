import App from 'next/app';
import React from 'react';

import { Store } from '../src/store/Store';
import Layout from '../src/components/Layout';

export default class MyApp extends App {
    // static async getInitialProps({ Component, ctx }) {
    //     let pageProps = {test: 'test'};

    //     if (Component.getInitialProps) {
    //         pageProps = await Component.getInitialProps(ctx);
    //     }

    //     return { pageProps };
    // }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Store>
                <Layout>
                    <Component />
                </Layout>
            </Store>
        );
    }
}


