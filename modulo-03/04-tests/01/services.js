const { get } = require('axios')

const URL = `https://swapi.co/api/people`


async function obterPessoa(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await get(url)
    return response.data.results.map(mapearPessoa)
}

function mapearPessoa(item) {
    return {
        nome: item.name,
        peso: item.height
    }
}

module.exports = {
    obterPessoa
}