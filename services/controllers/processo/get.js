import { processo } from "../../db/models/processo.js"
import { processoAdapter } from "../../adapters/processoAdapter.js"

export const getProcesso = async(req,res)=>{
    const {empresaId} = req.params
    const procesess = await processo.findAll({where:{empresaId:empresaId}})
    res.send(processoAdapter(procesess))
}

export const getProcessoById = async (empresaId,processoId)=>{
    const processoAchado = await processo.findOne({where:{empresaId:empresaId, id: processoId}})
    return processoAchado !== null
    ? processoAchado.dataValues
    : false
}