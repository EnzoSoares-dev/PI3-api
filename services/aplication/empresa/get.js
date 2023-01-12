import { empresa } from "../../db/models/empresa.js"

export const getEmpresa= async (user)=>{
    const login = await empresa.findOne({where:{email: user.email, password: user.password}})
    return login !== null
    ? login
    : false
}

export const getEmpresaById= async (id)=>{
    const login = await empresa.findOne({where:{id:id}})
    return login !== null
    ? login
    : false
}