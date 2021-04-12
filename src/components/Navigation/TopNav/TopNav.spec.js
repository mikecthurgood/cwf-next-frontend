import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Dispatch, State } from '../../../store/Store';
import TopNav from '.';

describe('Top Nav', () => {
    afterEach(cleanup);
    it('should dispatch close modal event when clicked', () => {
        const dispatch = jest.fn();
        const { container } = render(
            <Dispatch.Provider value={dispatch}>
                <TopNav />
            </Dispatch.Provider>,
        );

        expect(container).toMatchSnapshot()
    });

    it('should set the login menu to visible when clicked when user is logged out', () => {
        const dispatch = jest.fn();
        const { getByTestId } = render(
            <Dispatch.Provider value={dispatch}>
                <TopNav />
            </Dispatch.Provider>,
        );

        fireEvent.click(getByTestId('login-menu-toggle'));
        expect(dispatch).toHaveBeenCalledWith({
            type: "setLoginMenuVisible",
            data: true,
        })
    })

    it('should greet the user', () => {
        const dispatch = jest.fn();
        const state = {
            loginError: false,
            user: { username: 'Mr Test' },
            loginMenuVisible: false
        }
        const { container, getByText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state} >
                    <TopNav />
                </State.Provider>
            </Dispatch.Provider>,
        );

        expect(getByText('Hi Mr Test!')).toBeTruthy();
        expect(container).toMatchSnapshot()
    })

    it('should set the login menu to visible when clicked when user is logged in', () => {
        const dispatch = jest.fn();
        const state = {
            loginError: false,
            user: { username: 'Mr Test' },
            loginMenuVisible: false
        }
        const { container, getByTestId } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state} >
                    <TopNav />
                </State.Provider>
            </Dispatch.Provider>,
        );

        fireEvent.click(getByTestId('user-icon'));
        expect(dispatch).toHaveBeenCalledWith({
            type: "setLoginMenuVisible",
            data: true,
        })
    })
});
