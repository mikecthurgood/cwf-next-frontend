import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '.';
import { Dispatch, State } from '../../../store/Store';

jest.mock('../../../services/helpers/AuthHelpers');

describe('Login Form', () => {
    afterEach(() => {
        cleanup()
    })
    const dispatch = jest.fn();
    const state = {
        loginError: false
    };
    it('renders the component', () => {
        
        const { container } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <LoginForm />
                </State.Provider>
            </Dispatch.Provider>
        );
        
        expect(container).toMatchSnapshot();
    })

    it('renders the component in compact view', () => {
        
        const { container } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <LoginForm layout={'compact'} />
                </State.Provider>
            </Dispatch.Provider>
        );
        
        expect(container).toMatchSnapshot();
    })

    it('allows a username and passwors to be input', () => {
        
        const {getByPlaceholderText} = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <LoginForm />
                </State.Provider>
            </Dispatch.Provider>
        );
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
        fireEvent.change(passwordInput, { target: { value: 'qwerty' } })
        expect(emailInput.value).toEqual('test@test.com');
        expect(passwordInput.value).toEqual('qwerty');
    })

    it('allows a username and password to be input', () => {
        
        const {getByPlaceholderText, getByText} = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <LoginForm />
                </State.Provider>
            </Dispatch.Provider>
        );
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByText('Login');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
        fireEvent.change(passwordInput, { target: { value: 'qwerty' } })
        expect(loginButton.closest('button')).not.toBeDisabled();
    })

    it('submits a login event', () => {
        const {getByPlaceholderText, getByText} = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <LoginForm />
                </State.Provider>
            </Dispatch.Provider>
        );
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByText('Login');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
        fireEvent.change(passwordInput, { target: { value: 'qwerty' } })
        fireEvent.click(loginButton);
        expect(dispatch).toBeCalledWith({
            type: 'loginHandlerDispatchTest',
            data: {
                submitData: {
                    email: 'test@test.com',
                    password: 'qwerty'
                }
            },
        })
    })

    it('sets a login error if login is unsuccessful', () => {
        const {getByPlaceholderText, getByText} = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <LoginForm />
                </State.Provider>
            </Dispatch.Provider>
        );
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByText('Login');
        fireEvent.change(emailInput, { target: { value: 'failme' } })
        fireEvent.change(passwordInput, { target: { value: 'qwerty' } })
        fireEvent.click(loginButton);
        waitFor(() => {
            expect(dispatch).toBeCalledWith({
                type: 'setLoginError',
                data: true,
            })
        })
    })
})