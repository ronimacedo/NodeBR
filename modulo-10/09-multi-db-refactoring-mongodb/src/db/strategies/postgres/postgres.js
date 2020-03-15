const ICrud = require('./interfaces/interfaceCRUD')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }

   async  isConnected() {
        try {
            await this._driver.authenticate()
            return true
        }catch(error) {
            console.log('fail!',error)
            return false
        }
    }

    async create(item ) {
        const { dataValues } = await this._herois.create(item)
        return dataValues
    }

    async read(item = {}) {
        return this._herois.findAll({where: item,raw:true})
    }
    async update(id,item) {
        return this._herois.update(item,{where:{ id:id}})
    }
    async delete(id) {
        const query = id ? {id}:{}
        return this._herois.destroy({where: query})
    }

     async connect() {
        this._driver = new Sequelize(
            'heroes',
            'root',
            '1234',
            {
                host: 'localhost',
                dialect:'postgres',
                quoteIdentifiers:false,
                operatorALiases:false
            }
        )
        await this.defineModel()
    }
    async defineModel() {
        this._herois = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                require: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
         }, {
                tableName: 'TB_HEROIS',
                freezeTableName: false,
                timestamps: false
        })
    
    await this._herois.sync()
    }
}

module.exports = Postgres