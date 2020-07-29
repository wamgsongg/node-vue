const mongooes = require('mongoose')

const schema = new mongooes.Schema({
    username: {type: String},
    password: {
        type: String,
        select: false, //展示密码
        set(val) {
            return require('bcrypt').hashSync(val, 10) //散列指数
        }
    }

})

module.exports = mongooes.model('AdminUser', schema)