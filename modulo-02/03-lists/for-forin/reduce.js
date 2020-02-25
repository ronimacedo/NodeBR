const { obterPessoas } = require('./services')

//Implementando reduce

Array.prototype.meuReduce = function(callback,valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for(let index = 0;index <= this.lenght -1; index ++) {
        valorFinal = callback(valorFinal,this[index],this)
    }
    return valorFinal
}

async function main() {
    try {
        const { results } = await obterPessoas('a')
        const pesos = results.map((item,index) => parseInt(item.height))
        console.log('Pesos',pesos)
        // [20.2, 30.3, 40.5] = 0
        // const total = pesos.reduce((contador,item) => {
        //     return contador + item
        // },0)

        const minhaLista = [
            ['Ronielson','Macedo'],
            ['NodeBR','Comunidade']
        ]

        const total = minhaLista.reduce((anterior,proximo) => {
            return anterior.concat(proximo)
        }, []).join(', ')

        console.log('Total: ', total)

    }catch(err) {
        console.err('Error: ',err)
    }
}

main()