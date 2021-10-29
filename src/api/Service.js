import pokemonClient  from '../api/Axios';

const pokemonAll = function () {
    return pokemonClient.get('/api/v2/pokemon/');
}

const pokemon = function (pokemonName) {
    return pokemonClient.get(`/api/v2/pokemon/${pokemonName}`);
}

export default {
    pokemon,
    pokemonAll

}