import axios from 'axios';
const url = 'https://clambr-api.herokuapp.com/graphql';
// const url = 'http://localhost:8080/graphql';

export default function post (graphqlQuery) {
    return axios({
        url,
        method: 'POST',
        data: JSON.stringify(graphqlQuery),
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept'      : `application/json`
        }
    })
}