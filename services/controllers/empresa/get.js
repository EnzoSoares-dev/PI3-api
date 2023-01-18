import { empresa } from "../../db/models/empresa.js"
import { empresaAdapter } from "../../adapters/empresaAdapter.js"
import { validateHashPassword } from "../../Auth/hash/validate.js"

export const getEmpresa= async (req,res)=>{
    const login = await empresa.findOne({where:{email: req.body.email}})
    const validate = validateHashPassword(req.body.password,login.password)
    validate
    ? res.send(empresaAdapter(login.dataValues))
    : res.send('Dados informados não constam no sistema')
}

export const getEmpresaById= async (id)=>{
    const login = await empresa.findOne({where:{id:id}})
    return login !== null
    ? empresaAdapter(login.dataValues)
    : false
}