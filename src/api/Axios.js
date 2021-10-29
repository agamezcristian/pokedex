import axios from 'axios';

const apiPokemon = axios.create({
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});
export default apiPokemon;
