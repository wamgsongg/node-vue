const express = require('express')


const app = express()

//生成token的密钥
app.set('secret', 'd1fd1f56df6')

app.use(require('cors')())
app.use(express.json())
//托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/web', express.static(__dirname + '/web'))
require('./plugins/db')(app)

require('./routes/admin/index')(app)

require('./routes/web/index')(app)rm -rf .git

app.listen(3000, () => {
    console.log('http://localhost:3000');

})