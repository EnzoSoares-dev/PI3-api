import Express from "express"
import bodyParser from "body-parser"
import formidable from "formidable"
import fs from 'fs'
import path from 'path'
import url from 'url'
import cors from 'cors'
import { processoAdapter } from "../services/adapters/processoAdapter.js"
import { Database } from "../services/db/connection.js"
import { insertEmpresa } from "../services/controllers/empresa/insert.js"
import { getEmpresa } from "../services/controllers/empresa/get.js"
import { updateEmpresa } from "../services/controllers/empresa/update.js"
import { deleteEmpresa } from "../services/controllers/empresa/delete.js"
import { validateAccessToken } from "../services/Auth/authToken.js"
import { insertProcesso } from "../services/controllers/processo/insert.js"
import { getProcesso } from "../services/controllers/processo/get.js"
import { getProcessoById } from "../services/controllers/processo/get.js"
import { updateProcesso } from "../services/controllers/processo/update.js"
import { deleteProcesso } from "../services/controllers/processo/delete.js"

const App = Express()
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname("../images");
App.use(cors())
App.use(Express.urlencoded({extended:true}))
App.use(Express.static('public'))
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

App.post('/login', getEmpresa)
App.post('/empresa/register',insertEmpresa)
App.put('/empresa/update/:empresaId',validateAccessToken, updateEmpresa)
App.delete('/empresa/delete/:empresaId', validateAccessToken, deleteEmpresa)

App.post('/processo/create/:empresaId',validateAccessToken,insertProcesso)
App.get('/processo/:empresaId',validateAccessToken,getProcesso)
App.put('/processo/update/:processoId/:empresaId',validateAccessToken,updateProcesso)
App.delete('/processo/delete/:processoId/:empresaId',validateAccessToken,deleteProcesso)

App.listen(9000,()=>{
    console.log(`Program execution at port 9000`)
})