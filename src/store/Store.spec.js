import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { Store } from './store';

describe('Store component', () => {
    afterEach(cleanup);


    it('should render store', () => {
        const { container } = render(
            <Store>
                <h1>Hello I'm a heading</h1>
            </Store>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
