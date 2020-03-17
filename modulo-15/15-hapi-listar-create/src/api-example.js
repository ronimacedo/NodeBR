//npm install hapi
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextSrategy')
const mongoDb = require('./db/strategies/mongodb/mondodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')


const app = new Hapi.Server({
    port: 5000
})

async function main() {
    const connection = mongoDb.connect()
    const context = new Context(new mongoDb(connection, HeroiSchema))
    app.route([{
        path: '/herois',
        method: 'GET',
        handler: (request, head) => {
            return context.read()
        }
    }])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
}

main()