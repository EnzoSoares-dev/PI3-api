import { empresa } from "../../db/models/empresa.js"
import { cnpj } from "cpf-cnpj-validator"
import { generateHashPassword } from "../../Auth/hash/generate.js"

export const insertEmpresa = async (req,res)=>{
    const user = req.body
    if(cnpj.isValid(user.CNPJ)){
        if(await empresa.findOne({where:{email: user.email}}) === null){
            user.CNPJ = cnpj.format(user.CNPJ)
            user.password = await generateHashPassword(user.password)
            const result = await empresa.create(user)
            res.send({result: result})
        }
        else{
            res.send('Usuário já cadastrado')
        }
    }
}