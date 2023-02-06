import Express from "express"
import bodyParser from "body-parser"
import formidable from "formidable"
import fs from 'fs'
import path from 'path'
import url from 'url'
import { generateHashPassword } from "../services/Auth/hash/generate.js"
import { Database } from "../services/db/connection.js"
import { insertEmpresa } from "../services/controllers/empresa/insert.js"
import { getEmpresa, getEmpresaById } from "../services/controllers/empresa/get.js"
import { updateEmpresa } from "../services/controllers/empresa/update.js"
import { deleteEmpresa } from "../services/controllers/empresa/delete.js"
import { validateAccessToken } from "../services/Auth/authToken.js"
import { processo } from "../services/db/models/processo.js"

const App = Express()
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

App.get('/login', getEmpresa)
App.post('/empresa/register',insertEmpresa)
App.put('/empresa/update/:empresaId', updateEmpresa)
App.delete('/empresa/delete/:empresaId',deleteEmpresa)

App.post('/processo/create/:empresaId',validateAccessToken,async (req,res)=>{
    const form = new formidable.IncomingForm()
    form.parse(req,(err,fields,files)=>{
        const reqPath = files.image.filepath
        const hash = generateHashPassword(Date.now().toString())
        const img = `${hash}.${files.image.mimetype.split('/')[1]}`
        console.log(__dirname)
        const newPath = path.join(__dirname, 'public/images/', img)
        fs.rename(reqPath,newPath, (err)=>{
            if (err) throw err
        })
        const processos = {
            ...req.body,
            image: newPath,
            empresaId: req.params.empresaId
        }
        //const result = processo.create(processos)
        res.send(processos)
    })
})
App.get('/processo/:processoId/:empresaId',validateAccessToken,(req,res)=>{})
App.put('/processo/update/:processoId/:empresaId',validateAccessToken,(req,res)=>{})
App.delete('/processo/delete/:processoId/:empresaId',validateAccessToken,(req,res)=>{})

App.listen(9000,()=>{
    console.log(`Program execution at port 9000`)
})