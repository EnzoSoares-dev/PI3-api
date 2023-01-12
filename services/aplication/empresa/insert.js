import { empresa } from "../../db/models/empresa.js"
import { cnpj } from "cpf-cnpj-validator"

export const insert = async (user)=>{
    if(cnpj.isValid(user.CNPJ)){
        user.CNPJ = cnpj.format(user.CNPJ)
        const result = await empresa.create(user)
        return {resultado: result, user: user}
    }
    return false
}