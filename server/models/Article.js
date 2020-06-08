const mongooes = require('mongoose')

const schema = new mongooes.Schema({
    categories:[
        {type:mongooes.SchemaTypes.ObjectId,ref:'Category'}
    ],
    title:{type: String},
    body: {type: String},
   
})

module.exports = mongooes.model('Article',schema)