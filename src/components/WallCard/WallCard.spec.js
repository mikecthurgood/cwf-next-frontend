import React from 'react';
import { render } from '@testing-library/react';
import WallCard from '.';
import mockWalls from '../../../__tests__/mockWalls.json';
jest.mock('react-star-ratings');

describe('Wallcard', () => {
    it('should render a wall with ratings correctly', () => {
        const wall = mockWalls.wallsWithDistance[0]
        const { container } = render(
            <WallCard wall={wall} />
        );
        
        expect(container).toMatchSnapshot();
    });

    it('should render a wall without ratings correctly', () => {
        const wall = mockWalls.wallsWithDistance[1]
        const { container } = render(
            <WallCard wall={wall} />
        );
        
        expect(container).toMatchSnapshot();
    });
})