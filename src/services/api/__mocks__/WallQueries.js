import mockWalls from '../../../../__tests__/mockWalls.json';

const getWalls = async () => {
    const data = {
        data: {
            walls: {
                loggedIn: false,
                walls: mockWalls.walls
            },
        },
    };

    const promise = new Promise( async (resolve, reject) => {
        resolve({data});
    });

    return promise;
}
const getWallsWithDistance = async () => {
    const walls = {
        data: {
            data: {
                wallsWithDistance: {
                    loggedIn: false,
                    walls: mockWalls.wallsWithDistance
                }
            }
        }
    }
    return walls
}

export default {
    getWallsWithDistance,
    getWalls,
}
