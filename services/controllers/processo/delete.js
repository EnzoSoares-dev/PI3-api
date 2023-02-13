import { processo } from "../../db/models/processo.js"


export const deleteProcesso = async (req,res)=>{
    await processo.destroy({where:{empresaId:req.params.empresaId, id: req.params.processoId}})
    ? res.send(true)
    : res.send(false)
}