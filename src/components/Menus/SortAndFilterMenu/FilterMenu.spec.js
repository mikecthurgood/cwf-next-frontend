import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Dispatch, State } from '../../../store/Store';
import '@testing-library/jest-dom';
import FilterMenu from '.';


describe('Filter Menu', () => {
    let dispatch;
    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => {
        cleanup();
    })
    const state = {
        filterSelection: []
    };

    it('should render the component', () => {
        const { container } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <FilterMenu />
                </State.Provider>
            </Dispatch.Provider>
        );
        expect(container).toMatchSnapshot();
    });

    it('should set the menu to visible on click', () => {
        const { container, getByText, getByTestId } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <FilterMenu />
                </State.Provider>
            </Dispatch.Provider>
        );
        const menuToggle = getByText('+');
        fireEvent.click(menuToggle);
        expect(getByTestId('filter-menu').classList).toContain('visible')
        expect(container).toMatchSnapshot();
    })

    it('should allow users to select a filter via a checkbox', () => {
        const { getByText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <FilterMenu />
                </State.Provider>
            </Dispatch.Provider>
        );
        const autoBelayFilter = getByText('Auto Belay:')

        fireEvent.click(autoBelayFilter);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setFilterSelection',
            data: ['auto'],
        })
    })

    it('should allow users to select an additional filter when one is already selected', () => {
        state.filterSelection = ['auto']
        const { getByText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <FilterMenu />
                </State.Provider>
            </Dispatch.Provider>
        );
        const boulderingFilter = getByText('Bouldering:')
        fireEvent.click(boulderingFilter);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setFilterSelection',
            data: ['auto', 'bouldering'],
        })
    })

    it('should allow users to deselect a filter if it is already selected', () => {
        state.filterSelection = ['auto', 'top']
        const { getByText } = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <FilterMenu />
                </State.Provider>
            </Dispatch.Provider>
        );
        const topRopeFilter = getByText('Top Roping:')
        fireEvent.click(topRopeFilter);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setFilterSelection',
            data: ['auto'],
        })
    })
})