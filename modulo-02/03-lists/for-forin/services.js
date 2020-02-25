const axios = require('axios')
const URL = `https://swapi.co/api/people`


async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url) /* Axios é uma promise */
    return response.data
}

module.exports = {
    obterPessoas
}

