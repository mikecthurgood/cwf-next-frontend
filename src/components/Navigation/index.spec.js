import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Nav from '.';

describe('Secondary Nav', () => {
    afterEach(cleanup);
    it('render the component', () => {
        const { container } = render(
            <Nav />
        );

        expect(container).toMatchSnapshot()
    });
});
