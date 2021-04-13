import react from 'react';
import Index from '../../pages';
import {render, cleanup} from '@testing-library/react';
import wallsData from '../mockWalls.json';
import { State, Dispatch } from  '../../src/store/Store';

jest.mock('react-star-ratings')
jest.mock('../../src/services/helpers/WallHelpers');
jest.mock('../../src/services/api/WallQueries.js');

describe('pages index', () => {
    const dispatch = jest.fn();
    const state = {
        walls: null,
        userPostcode: '',
        filterSelection: [],
        user: {
            username: 'Old Captain Testy',
        }
    };

    afterEach(cleanup);

    it('passes a test', () => {
        expect(2).toEqual(2);
    })

    it('renders the component with a loading screen if no walls are available', () => {
        const {container} = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <Index />
                </State.Provider>
            </Dispatch.Provider>
        )
        expect(container).toMatchSnapshot();

    })

    it('renders the component with a loading screen if no walls are available and user postcode is set', () => {
        state.userPostcode = 'A11 1AA'
        const {container} = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <Index />
                </State.Provider>
            </Dispatch.Provider>
        )
        expect(container).toMatchSnapshot();
    })

    it('renders the component with wallcards for each wall if walls are returned', () => {
        state.walls = wallsData.walls;
        state.userPostcode = '';
        const {container} = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <Index />
                </State.Provider>
            </Dispatch.Provider>
        )
        expect(container).toMatchSnapshot();
    })

    it('renders the component with wallcards and distance from postcode for each wall if walls are returned', () => {
        state.walls = wallsData.wallsWithDistance;
        state.userPostcode = 'A11 1AA';
        const {container} = render(
            <Dispatch.Provider value={dispatch}>
                <State.Provider value={state}>
                    <Index />
                </State.Provider>
            </Dispatch.Provider>
        )
        expect(container).toMatchSnapshot();
    })
})


