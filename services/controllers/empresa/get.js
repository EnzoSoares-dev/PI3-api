import { empresa } from "../../db/models/empresa.js"
import { empresaAdapter } from "../../adapters/empresaAdapter.js"
import Jwt from "jsonwebtoken"
import { validateHashPassword } from "../../Auth/hash/validate.js"

export const getEmpresa= async (req,res)=>{
    const login = await empresa.findOne({where:{email: req.body.email}})
    const validate = validateHashPassword(req.body.password,login.password)
    const response = {
        ...empresaAdapter(login.dataValues),
        role: 'empresa'
    }
    validate
    ? res.send(Jwt.sign(response,'1ee8aa2602ca4b6b2b4e3b654c22ceb161c492f7'),response)
    : res.send('Dados informados não constam no sistema')
}

export const getEmpresaById= async (id)=>{
    const login = await empresa.findOne({where:{id:id}})
    return login !== null
    ? empresaAdapter(login.dataValues)
    : false
}