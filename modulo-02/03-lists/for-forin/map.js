const services = require('./services')

//Implementando Map
Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for(let indice = 0; indice <= this.length - 1; indice++) {
        const resultado = callback(this[indice],indice)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado

}

async function main() {
    try{
        const results = await services.obterPessoas('a')
        //  const names = results.results.map((pessoa,indice) => {
        //     return `[${indice}] - ${pessoa.name}`
        //  })
        const names = results.results.meuMap((pessoa,indice) => {
           return `[${indice}] - ${pessoa.name}` 
        })
    

        console.log('names: ',names)
        console.log('quantidade: ', names.length)
    }catch(err) {
        console.error('Error: ',err)
    }
    
}

main()