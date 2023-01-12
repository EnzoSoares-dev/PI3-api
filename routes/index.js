import Express from "express"
import { cnpj } from "cpf-cnpj-validator"
import { insert } from "../services/aplication/empresa/insert.js"
import { Database } from "../services/db/connection.js"
import { getEmpresa } from "../services/aplication/empresa/get.js";

const App = Express()
;(async ()=>{
    try{
        const result = await Database.sync()
        console.log(result)
    }catch(err){
        console.log(err)
    }
})()

const middleTeste = (req,res,next)=>{
    console.log('teste')
    next();
}

App.use(middleTeste)
App.get(`/`,(req,res)=>{
    res.send('works')
})

App.get('/login',(req,res)=>{
    const user = {
        email: 'beckerltda@financeiro.com',
        password: '123456'
    }
    getEmpresa(user)
    ? res.send('erro')
    : res.send(user)
})
App.post('empresa/register',(req,res)=>{
    const user={
        name: 'becker ltda',
        CNPJ: cnpj.generate(),
        email: 'beckerltda@financeiro.com',
        password: '123456'
    }
    insert(user)
        ? res.send(user)
        : res.send('')
})
App.put('/empresa/update/:empresaId',(req,res)=>{})
App.delete('empresa/delete/:empresaId',()=>{})

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