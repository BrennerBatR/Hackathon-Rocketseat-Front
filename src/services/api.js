import axios from 'axios';

const api = axios.create({
    baseURL: 'https://hackathon-rocketseat.herokuapp.com'
});

export default api;