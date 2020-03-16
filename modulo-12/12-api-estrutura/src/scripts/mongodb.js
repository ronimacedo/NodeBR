// docker ps
//docker exec -it d46df82235a3 mongo -u ronimacedo -p minhasenha --authenticationDatabase herois

//databases
show dbs

//mudando o contexto para uma database
use herois

//mostrar tables ( coleções )
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for(let i =0; i<10000;i++) {
    db.herois.insert({
    nome: `Clone ${i}`,
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({nome: -1})
db.herois.find({},{poder: 1,_id:0})


//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find()

//update

db.herois.update({ _id: ObjectId("5e6e80466b66d643e1714a1c")}, 
{
    nome: 'MUlher maravilha'
})

db.herois.update({ _id: ObjectId("5e6e81116b66d643e1714e04")},
{
   $set: {nome: 'Lanterna Verde'}
})

db.herois.update({ poder: 'Velocidade'},
{
   $set: {poder:'super força'}
})


//delete
db.herois.remove({})
db.herois.remove({nome:'Mulher maravilha'})