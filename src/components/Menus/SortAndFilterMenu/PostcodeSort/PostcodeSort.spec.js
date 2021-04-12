import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Dispatch, State } from '../../../../store/Store';
import '@testing-library/jest-dom';
import PostcodeSort from '.';


describe('Postcode Sort', () => {
    let dispatch;
    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => {
        cleanup();
    })
    const state = {
        userPostcode: '',
    };

    const setFilterMenuVisibility = jest.fn();

    it('should render the component', () => {
        const { container } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <PostcodeSort setFilterMenuVisibility={setFilterMenuVisibility} />
                </State.Provider>
            </Dispatch.Provider>
        );
        expect(container).toMatchSnapshot();
    });

    it('should display the user postcode if set and give option to change it', () => {
        state.userPostcode = 'te5 t1ng'
        const { container } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <PostcodeSort setFilterMenuVisibility={setFilterMenuVisibility} />
                </State.Provider>
            </Dispatch.Provider>
        );

        expect(container).toMatchSnapshot();
    })

    it('should open the postcode input if "change" button is clicked', () => {
        state.userPostcode = 'te5 t1ng'
        const { container, getByText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <PostcodeSort setFilterMenuVisibility={setFilterMenuVisibility} />
                </State.Provider>
            </Dispatch.Provider>
        );

        const changePostcodeLink = getByText('Change');
        fireEvent.click(changePostcodeLink);
        expect(container).toMatchSnapshot();
    })

    it('should clear the postcode when "clear" button is clicked', () => {
        state.userPostcode = 'te5 t1ng'
        localStorage.setItem('userPostcode', 'te5 t1ng')

        const { container, getByText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <PostcodeSort setFilterMenuVisibility={setFilterMenuVisibility} />
                </State.Provider>
            </Dispatch.Provider>
        );
        const clearPostcodeLink = getByText('Clear');
        fireEvent.click(clearPostcodeLink);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setPostcode',
            data: '',
        });
        expect(localStorage.getItem('userPostcode')).toBe(null);
        expect(container).toMatchSnapshot();
    })

    it('should change the postcode when a new postcode is entered', () => {
        state.userPostcode = 'te5 t1ng'
        localStorage.setItem('userPostcode', 'te5 t1ng')
        
        const { getByText, getByPlaceholderText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <PostcodeSort setFilterMenuVisibility={setFilterMenuVisibility} />
                </State.Provider>
            </Dispatch.Provider>
        );
        const changePostcode = getByText('Change')
        fireEvent.click(changePostcode);

        const postcodeInput = getByPlaceholderText('Enter Postcode');
        fireEvent.change(postcodeInput, { target: { value: 'AA1 1AA' } })

        const submitPostcodeButton = getByText('Set');
        fireEvent.click(submitPostcodeButton);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setPostcode',
            data: 'AA1 1AA'
        })

        expect (setFilterMenuVisibility).toHaveBeenCalled();
    })

    it('should be able to clear postcode by submitting an empty string', () => {
        state.userPostcode = 'te5 t1ng'
        localStorage.setItem('userPostcode', 'te5 t1ng')
        
        const { getByText, getByPlaceholderText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <PostcodeSort setFilterMenuVisibility={setFilterMenuVisibility} />
                </State.Provider>
            </Dispatch.Provider>
        );
        const changePostcode = getByText('Change')
        fireEvent.click(changePostcode);

        const postcodeInput = getByPlaceholderText('Enter Postcode');
        fireEvent.change(postcodeInput, { target: { value: '' } })

        const submitPostcodeButton = getByText('Set');
        fireEvent.click(submitPostcodeButton);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setPostcode',
            data: ''
        })

        expect (setFilterMenuVisibility).toHaveBeenCalled();
    })
})