    /*
    0 - Obter um usuario
    1 - Obter o número de telefone de um usuário a partir de seu ID.
    2 - Obter o endereço do usuario pelo ID
    */

    // Importando modulo interno nodeJs
    const util = require('util')
    const obterEnderecoAsync = util.promisify(getEndereco) /* Convertendo para promise automaticamente */

    function getUsuario(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            // return reject(new Error('DEU RUIM DE VERDADE'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        },1000)
    })  
}
    function getTelefone(id){
    return new Promise((resolve,reject) => {
            setTimeout(() => {
                return resolve({
                    telefone: '110090',
                    ddd: 11
                })     
            },2000)
    })
}
    function getEndereco(id,callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    },2000)
}

    /* Async - Automaticamente ela retornará uma Promise */
    main()
    async function main() {
        try {
            console.time('medida-promise')
            const usuario = await getUsuario()
            const resultado = await Promise.all([
                getTelefone(usuario.id),
                obterEnderecoAsync(usuario.id)
            ])
            const endereco = resultado[1]
            const telefone = resultado[0]
            console.log(`
                         Nome: ${usuario.nome},
                         Telefone: (${telefone.ddd}) ${telefone.telefone}
                         Endereço: ${endereco.rua},${endereco.numero}`)
            console.timeEnd('medida-promise')
        }catch(error) {
            console.error('Deu ruim : S',error)
    }
}
