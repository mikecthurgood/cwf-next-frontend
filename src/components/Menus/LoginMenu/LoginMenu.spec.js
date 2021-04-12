import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Dispatch, State } from '../../../store/Store';
import LoginMenu from '.';

describe('Login Menu', () => {
    afterEach(cleanup);
    it('render the component', () => {
        const dispatch = jest.fn();
        const state = {
            user: { username: 'Mr Test' },
            loginMenuVisible: true
        }
        const { container } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state} >
                    <LoginMenu />
                </State.Provider>
            </Dispatch.Provider>,
        );

        expect(container).toMatchSnapshot()
    })

    it('should send a dispatch call to sign out a user if logged in', () => {
        const dispatch = jest.fn();
        const state = {
            user: { username: 'Mr Test' },
            loginMenuVisible: true
        }
        const { getByText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state} >
                    <LoginMenu />
                </State.Provider>
            </Dispatch.Provider>,
        );

        fireEvent.click(getByText('Log out'));
        expect(dispatch).toHaveBeenCalledWith({type: 'signOut'})

    })

    it('should open the login form in the login menu', () => {
        const dispatch = jest.fn();
        const state = {
            user: { username: '' },
            loginMenuVisible: true
        }
        const { container, getByTestId } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state} >
                    <LoginMenu />
                </State.Provider>
            </Dispatch.Provider>,
        );

        fireEvent.click(getByTestId('login-form-control'));
        expect(container).toMatchSnapshot();
    })

    it('should send a user to the registration page', () => {
        const dispatch = jest.fn();
        const state = {
            user: { username: '' },
            loginMenuVisible: true
        }
        const { getByText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state} >
                    <LoginMenu />
                </State.Provider>
            </Dispatch.Provider>,
        );

        fireEvent.click(getByText('Register'));
        expect(dispatch).toHaveBeenCalledWith({type: 'setLoginMenuVisible', data: false});
    })
});
