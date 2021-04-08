import API from '../api/WallQueries';

module.exports = {
    async fetchWalls (dispatch, postcode) {
        let response;
        if (postcode) {
            response = await API.getWallsWithDistance(postcode);
        } else {
            response = await API.getWalls();
        };
        const data = response.data.data.walls || response.data.data.wallsWithDistance
        return dispatch({type: 'setWalls', data: data.walls })
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
            if (showWall) return wall
        })

        return filteredWalls
    }
}