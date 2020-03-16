//npm install sequelize
//npm install pg-hstore
//npm install pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {
    const Herois = driver.define('heroes', {
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

await Herois.sync()
await Herois.create({
    nome: 'Lanterna Verde',
    poder: 'Anel'
})

const result = await Herois.findAll({
    raw:true,
    attributes: ['nome']
    
    })
console.log('result', result)
}

main()