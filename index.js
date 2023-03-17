const express=require('express')
const app=express()
const body_parser=require('body-parser')
const router=require('././routes/route.js')
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))

app.use('/',router)

app.listen((process.env.port||3001),function(){
    console.log('express is running on port',(process.env.port||3000))
})