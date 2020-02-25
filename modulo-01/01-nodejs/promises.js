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


    const usuarioPromise = getUsuario()
    usuarioPromise
    .then((usuario) => {
        return getTelefone(usuario.id).then((result) => {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then((resultado) => {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then((result)=> {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then((resultado) => {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua},${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}`)
    })
    .catch((error) => {
        console.log('DEU RUIM EM ', error)
    })


    //Para manipular o sucesso utilizamos a função .then
    //Para manipular a falha utilizamos .catch
