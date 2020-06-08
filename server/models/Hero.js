const mongooes = require('mongoose')

const schema = new mongooes.Schema({
    name:{type: String},
    avatar:{type: String},
    title:{type:String},
    categories:[
        {type:mongooes.SchemaTypes.ObjectId,ref:'Category'}
    ],
    scores:{
        difficult: {type: Number},
        skills: {type: Number},
        attack: {type: Number},
        survive: {type: Number},
    },
    skills:[{
        icon:{type: String},
        name:{type: String},
        description:{type: String},
        tips:{type: String},
    }],
    items1:[{type: mongooes.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{type: mongooes.SchemaTypes.ObjectId,ref:'Item'}],
    usageTips:{type: String},
    battleTips:{type: String},
    teamTips:{type: String},
    partners:[{
        hero:{type: mongooes.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String},
    }],
})

module.exports = mongooes.model('Hero',schema)