const mongooes = require('mongoose')

const schema = new mongooes.Schema({
    name: {type: String},
    parent: {type: mongooes.SchemaTypes.ObjectId, ref: 'Category'},
})

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

module.exports = mongooes.model('Category', schema)