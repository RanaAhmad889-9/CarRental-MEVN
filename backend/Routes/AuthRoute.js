const app=require('express')
const route=app.Router()
const AuthController=require('../Controller/AuthController')

route.post('/login',AuthController.login)

module.exports=route