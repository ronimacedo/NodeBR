const fs = require('fs')
const util = require('util')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

//Outra forma de obter dados do json
//const dadosJson = require('./herois.json')

class Database {
    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }
    /* Metodos auxiliares para ajudar na obtenção de arquivos */
   async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO,'utf8')
        return JSON.parse(arquivo.toString())
    }
   async  escreverArquivos(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }
   async cadastrar(heroi) {
         const dados = await this.obterDadosArquivo()
         const id = heroi.id <= 2 ? heroi.id : Date.now() ;
         const heroiComId = {
             id,
             ...heroi
         }
         const dadosFinal = [
             ...dados,
             heroiComId
         ]

         const resultado = await this.escreverArquivos(dadosFinal)
         return resultado
   } 
   async listar(id) {
       const dados = await this.obterDadosArquivo()
       const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
       return dadosFiltrados
    }
   async remover(id) {
       if(!id) {
           return await this.escreverArquivos([])     
       }

       const dados = await this.obterDadosArquivo()
       const indice = dados.findIndex(item => item.id === parseInt(id))
       if(indice === -1) {
           throw Error('O usuário informado não existe')
       }     
       dados.splice(indice,1)
       return await this.escreverArquivos(dados)
   }
   async atualizar(id,modificacoes) {
       const dados = await this.obterDadosArquivo()
       const indice = dados.findIndex(item => item.id === parseInt(id))
       if(indice === -1) {
           throw Error('O heroi informado não existe')
       }
       const actual = dados[indice]
       const objetoAtualizar = {
           ...actual,
           ...modificacoes
       }
       dados.splice(indice,1)

       
       return await this.escreverArquivos([
           ...dados,
           objetoAtualizar
       ])
   }
    
}

module.exports = new Database()