import API from '../api/WallQueries';

module.exports = {
    async fetchWalls (dispatch, postcode) {
        let response;
        if (postcode) {
            response = await API.getWallsWithDistance(postcode).then(resp => resp.json());
        } else {
            response = await API.getWalls().then(resp => resp.json());
        };
        const { walls } = response.data.walls;
        return dispatch({type: 'setWalls', data: walls })
    },
}