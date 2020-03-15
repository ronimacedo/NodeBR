const ICrud = require('./interfaces/interfaceCRUD')


class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item ) {
        console.log('O item foi salvo em Postgres')
    }
}

module.exports = Postgres