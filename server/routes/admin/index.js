module.exports = app => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const express  = require('express')
    const httpAssert = require('http-assert')

    const router = express.Router({
        mergeParams:true //合并参数
    })

   
    //创建资源
    router.post('/',async(req,res) => {
       
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //更新资源
    router.put('/:id',async(req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
     })

     //删除资源
     router.delete('/:id',async(req,res) => {
         
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
     })


     //资源列表
    router.get('/' ,async(req,res) => {
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
     })

     //资源详情
     router.get('/:id',async(req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
     })

     const auth = require('../../middleware/auth')

    app.use('/admin/api/rest/:resource',auth(),async (req,res,next)=>{
        //使用inflection将小写复数转换成首字母大写单数,使用中间键
        const modelName = require('inflection').classify(req.params.resource)
        
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)




    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload',auth(),upload.single('file'), async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    app.post('/admin/api/login',async(req,res) => {
        //res.send('ok')
        const {username,password} = req.body //解构用户名密码
        //找用户，校验，返回token
        //密码已经散列
        console.log(username);
        
      
        const user = await AdminUser.findOne({username}).select('+password')//默认不取
        httpAssert(user,422,'用户不存在')
       
        // if(!user){
        //     return res.status(422).send({
        //         message:
        //     })

        // }
        const isValid = require('bcrypt').compareSync(password,user.password)
        
        httpAssert(isValid,422,'密码错误')
       
        //token生成
        const token = jwt.sign({
            id:user._id,
            // _id:user._id,
            // username:user,username,
        },app.get('secret'))//get一个参数获取配置
        res.send({token})
    })

//错误处理
    app.use(async (err,req,res,next) => {
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}
