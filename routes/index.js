import Express, { application } from "express"
import bodyParser from "body-parser"
import { cnpj } from "cpf-cnpj-validator"
import { Database } from "../services/db/connection.js"
import { insertEmpresa } from "../services/controllers/empresa/insert.js"
import { getEmpresa, getEmpresaById } from "../services/controllers/empresa/get.js"
import { updateEmpresa } from "../services/controllers/empresa/update.js"
import { deleteEmpresa } from "../services/controllers/empresa/delete.js"

const App = Express()
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({extended:true}))
;(async ()=>{
    try{
        const result = await Database.sync()
        console.log(result)
    }catch(err){
        console.log(err)
    }
})()

App.get(`/`,(req,res)=>{
    res.send('works')
})

App.get('/login', getEmpresa)
App.post('/empresa/register',insertEmpresa)
App.put('/empresa/update/:empresaId', updateEmpresa)
App.delete('/empresa/delete/:empresaId',deleteEmpresa)

App.post('/processo/create',(req,res)=>{})
App.get('/processo',(req,res)=>{
    res.send('alo')
})
App.get('/processo/:processoId/:empresaId',(req,res)=>{})
App.put('/processo/:processoId/:empresaId',(req,res)=>{})
App.delete('/processo/:processoId/:empresaId',(req,res)=>{})

App.listen(9000,()=>{
    console.log(`Program execution at port 9000`)
})