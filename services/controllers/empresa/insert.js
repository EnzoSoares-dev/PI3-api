import { empresa } from "../../db/models/empresa.js"
import { cnpj } from "cpf-cnpj-validator"
import { empresaAdapter } from "../../adapters/empresaAdapter.js"
import Jwt from "jsonwebtoken"
import { generateHashPassword } from "../../Auth/hash/generate.js"

export const insertEmpresa = async (req,res)=>{
    const user = req.body
    if(cnpj.isValid(user.CNPJ)){
        if(await empresa.findOne({where:{email: user.email}}) === null){
            user.CNPJ = cnpj.format(user.CNPJ)
            user.password = await generateHashPassword(user.password)
            const result = await empresa.create(user)
            const response = {
                ...empresaAdapter(result),
                role: 'empresa'
            }

            res.send({token:Jwt.sign(response,'1ee8aa2602ca4b6b2b4e3b654c22ceb161c492f7'),obj:response})
        }
        else{
            res.send('Usuário já cadastrado')
        }
    }
}