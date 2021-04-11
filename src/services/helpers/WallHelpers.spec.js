import { fetchWalls, filterWalls } from './WallHelpers';
import mockWalls from '../../../__tests__/mockWalls.json';

jest.mock('../api/WallQueries');

describe('WallHelpers', () => {
    it('should fetch walls', async () => {
        const dispatch = jest.fn()

        await fetchWalls(dispatch)
        expect(dispatch).toHaveBeenCalledWith({
            type: 'setWalls',
            data: mockWalls.walls
        })
    })

    it('should fetch walls with distance if postcode is included', async () => {
        const dispatch = jest.fn()

        await fetchWalls(dispatch, 'a11 1aa')
        expect(dispatch).toHaveBeenCalledWith({
            type: 'setWalls',
            data: mockWalls.wallsWithDistance
        })
    })

    it('should filter walls', () => {
        const walls = mockWalls.wallsToFilter
        const filters = ['lead']
        const filteredWalls = filterWalls(filters, walls)
        expect(filteredWalls.length).toBe(1)
    })

    it('should filter walls', () => {
        const walls = mockWalls.wallsToFilter
        const filters = ['top']
        const filteredWalls = filterWalls(filters, walls)
        expect(filteredWalls.length).toBe(2)
    })

    it('should filter walls', () => {
        const walls = mockWalls.wallsToFilter
        const filters = ['auto']
        const filteredWalls = filterWalls(filters, walls)
        expect(filteredWalls.length).toBe(1)
    })

    it('should return all walls if no filter is present', () => {
        const walls = mockWalls.wallsToFilter
        const filters = []
        const filteredWalls = filterWalls(filters, walls)
        expect(filteredWalls).toEqual(walls)
    })

    it('should return all walls if only bouldering is selected as a filter', () => {
        const walls = mockWalls.wallsToFilter
        const filters = ['bouldering']
        const filteredWalls = filterWalls(filters, walls)
        expect(filteredWalls).toEqual(walls)
    })
    
});
