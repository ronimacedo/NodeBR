const assert = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { 
    nome: 'Flash',
    poder: 'Speed',
    id: 3
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do anel',
    id: 2
}

//Inicializando switch de testes
describe('Suite de manipulação de Herois', () => {
    beforeEach(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar um heroi usando arquivos ', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        
        assert.deepEqual(resultado,expected)
    })
    it('deve cadastrar um heroi , usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR 
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        assert.deepEqual(actual,expected)
    })
    it('deve remover um heroi', async ()=> {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

        assert.deepEqual(resultado,expected)
    })
    it.only('deve atualizar os dados do heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id,novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        assert.deepEqual(resultado,expected)
    })
})