const ContextStrategy = require('./db/strategies/base/contextSrategy')
const MongoDB = require('./db/strategies/mondodb')
const Postgres = require('./db/strategies/postgres')


contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()
