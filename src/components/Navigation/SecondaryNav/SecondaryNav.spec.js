import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Dispatch } from '../../../store/Store';
import SecondaryNav from '.';

describe('Secondary Nav', () => {
    afterEach(cleanup);
    it('render the component', () => {
        const dispatch = jest.fn();
        const { container } = render(
            <Dispatch.Provider value={dispatch}>
                <SecondaryNav />
            </Dispatch.Provider>,
        );

        expect(container).toMatchSnapshot()
    });
});
