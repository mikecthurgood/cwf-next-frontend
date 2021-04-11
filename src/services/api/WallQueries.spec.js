import API from './WallQueries';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockWalls from '../../../__tests__/mockWalls.json';

describe('WallQueries', () => {
    let mock;
    const url = 'https://clambr-api.herokuapp.com/graphql';

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    it('should call the api to fetch walls', async () => {
        const { walls } = mockWalls
        mock.onPost(url).reply(200, mockWalls.walls)
        const response = await API.getWalls()        
        expect(response.data).toEqual(walls)
        expect(response.data[0].distance).toEqual(undefined)
    })

    it('should call the api to fetch walls', async () => {
        const { wallsWithDistance } = mockWalls
        mock.onPost(url).reply(200, wallsWithDistance)
        const response = await API.getWallsWithDistance('a11 1aa')        
        expect(response.data).toEqual(wallsWithDistance)
        expect(response.data[0].distance).not.toEqual(undefined)
    })
})