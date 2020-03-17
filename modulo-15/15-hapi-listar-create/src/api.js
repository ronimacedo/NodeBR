//npm install hapi
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextSrategy')
const mongoDb = require('./db/strategies/mongodb/mondodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')


const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance,methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = mongoDb.connect()
    const context = new Context(new mongoDb(connection, HeroiSchema))
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}

module.exports = main()