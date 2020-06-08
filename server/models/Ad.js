const mongooes = require('mongoose')

const schema = new mongooes.Schema({
    name:{type: String},
    items:[{
        image:{type: String},
        url:{type:String},
    }]
   
})

module.exports = mongooes.model('Ad',schema)