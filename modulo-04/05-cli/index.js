const Commander = require('commander')
const database = require('./database')
const Heroi = require('./heroi')


async function main() {
    Commander.version('v1')
             .option('-n, --nome [value]','Nome do Heroi')
             .option('-p, --poder [value]','Poder do Heroi')
             .option('-i, --id [value]', 'Id do Heroi')

             .option('-c, --cadastrar', 'Cadastrar um heroi')
             .option('-l, --listar','Listar um heroi')
             .option('-r, --remover','Remover um heroi')
             .option('-a, --atualizar [value]','Atualizar um heroi')
    .parse(process.argv)
    
    const heroi = new Heroi(Commander)

    try {
        /* Para cadastrar o usuario preciso pegar alguns parametros no options */
        if(Commander.cadastrar) {
            delete heroi.id
            const response = await database.cadastrar(heroi)
            if(!response) {
                console.error('Heroi não foi cadastrado!')
                return
            }
            console.log('Heroi cadastrado com sucesso!! :D')
        }
        if(Commander.listar) {
            const response = await database.listar()
            console.log(response)
            return
        }
        if(Commander.remover) {
            const response = await database.remover(heroi.id)
            if(!response) {
                console.log('Não foi possivel remover o Heroi')
                return
            }
            console.error('Heroi foi removido com sucesso!! :S')
        }
        if(Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            //remover todas as chaves que estiverem com undefined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await database.atualizar(idParaAtualizar,heroiAtualizar)
            if(!resultado) {
                console.error('Não foi possivel atualizar o heroi!!')
                return
            }
            console.log('Heroi atualizado com sucesso!')
        }

    }catch(err) {
        console.error('Deu ruim : S ',err)
    }
}

main()

