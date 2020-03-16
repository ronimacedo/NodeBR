const assert = require('assert')
const api = require('./../api')

describe.only('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        console.log('result',result)
        
        assert.deepEqual(statusCode,200)
        assert.ok(Array.isArray(dados))
    })

    it('listar /herois - deve retornar somente 10 registros', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.deepEqual(statusCode,500)
        assert.ok(dados.length === TAMANHO_LIMITE)

    })

    it('listar /herois - deve filtrar um item', async () => {
        const NAME = 'Homem Aranha-123442321'
        const TAMANHO_LIMITE = 1000
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.deepEqual(statusCode,500)
        assert.ok(dados.length === TAMANHO_LIMITE)

    })
})