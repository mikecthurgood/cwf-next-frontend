import wallsData from '../../../../__tests__/mockWalls.json';

module.exports = {
    async fetchWalls(dispatch, postcode) {   
        const wallsToReturn = wallsData.walls
        return dispatch({ type: 'setWalls', data: wallsToReturn });
    },

    filterWalls(filters, walls) {               
        if (filters.length === 0 || (filters.length === 1 && filters[0] === 'bouldering') ) {
            return walls
        }

        const filteredWalls = walls.filter(wall => {    
            let showWall = false;
            for(let i = filters.length; i--;) {
                if (wall[filters[i]]) {
                    showWall = true;
                }
            }
            if (showWall) return wall;
        })

        return filteredWalls
    }
}