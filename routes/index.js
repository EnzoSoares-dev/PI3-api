import Express from "express"
import bodyParser from "body-parser"
import formidable from "formidable"
import fs from 'fs'
import path from 'path'
import url from 'url'
import cors from 'cors'
import { generateHashPassword } from "../services/Auth/hash/generate.js"
import { Database } from "../services/db/connection.js"
import { insertEmpresa } from "../services/controllers/empresa/insert.js"
import { getEmpresa } from "../services/controllers/empresa/get.js"
import { updateEmpresa } from "../services/controllers/empresa/update.js"
import { deleteEmpresa } from "../services/controllers/empresa/delete.js"
import { validateAccessToken } from "../services/Auth/authToken.js"
import { processo } from "../services/db/models/processo.js"

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

App.post('/processo/create/:empresaId',validateAccessToken,async (req,res)=>{
console.log(req.body)
    const form = new formidable.IncomingForm()
    form.parse(req,async (err,fields,files)=>{
        const reqPath = files.image.path
        console.log(reqPath)
        const hash = await generateHashPassword(Date.now().toString())
        const img = `${hash}.${files.image.mimetype.split('/')[1]}`
        console.log("img: ",img)
        const newPath = path.join(__dirname, 'public/images/', img)
        console.log(newPath)
        fs.rename(reqPath,newPath, (err)=>{
            if (err) throw err
        })
        const processos = {
            name:req.body.name,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            steps:req.body.steps,
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