import { empresa } from "../../db/models/empresa.js"
import { empresaAdapter } from "../../adapters/empresaAdapter.js"
export const getEmpresa= async (req,res)=>{
    const login = await empresa.findOne({where:{email: req.body.email, password: req.body.password}})
    return login !== null
    ? empresaAdapter(login.dataValues)
    : false
}

export const getEmpresaById= async (req,res)=>{
    const login = await empresa.findOne({where:{id:req.params.id}})
    return login !== null
    ? empresaAdapter(login.dataValues)
    : false
}