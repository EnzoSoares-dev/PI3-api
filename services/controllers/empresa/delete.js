import { empresa } from "../../db/models/empresa.js"

export const deleteEmpresa = async (req,res) => {
    await empresa.destroy({where:{id:req.params.empresaId}})
    ? res.send(true)
    : res.send(false)
}