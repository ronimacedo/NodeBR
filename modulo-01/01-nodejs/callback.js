/*
0 - Obter um usuario
1 - Obter o número de telefone de um usuário a partir de seu ID.
2 - Obter o endereço do usuario pelo ID
*/

function getUsuario(callback){
    setTimeout(() => {
        return callback(null,{
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })

    },1000)
}

function getTelefone(id,callback){
    setTimeout(() => {
        return callback(null, {
            telefone: '110090',
            ddd: 11
        })
    },2000)
}

function getEndereco(id,callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    },2000)
}


getUsuario(function resolverUsuario(error,usuario) {
    //null || "" || 0 === false
    if(error){
        console.error('Deu ruim em usuário',error)
        return
    }

    getTelefone(usuario.id, function resolverTelefone(error1,telefone) {
        if(error1){
            console.error('Deu ruim em usuário',error)
            return
        }
            getEndereco(usuario.id,function resolverEndereco(error2,endereco) {
                if(error2){
                    console.error('Deu ruim em usuário',error)
                    return
                }

                console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua},${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone} `)
            })
    }) 

})


