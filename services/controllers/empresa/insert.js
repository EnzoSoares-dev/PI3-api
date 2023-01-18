import { empresa } from "../../db/models/empresa.js"
import { cnpj } from "cpf-cnpj-validator"

export const insertEmpresa = async (req,res)=>{
    const user = req.body
    if(cnpj.isValid(user.CNPJ)){
        if(empresa.findOne({where:{email: user.email}})===null){
            user.CNPJ = cnpj.format(user.CNPJ)
            const result = await empresa.create(user)
            res.send({resultado: result, user: user})
        }
        res.send('Email de usuário já cadastrado')
    }

}