import { empresa } from "../../db/models/empresa.js"

export const deleteEmpresa = async (id) => {
    return await empresa.destroy({where:{id:id}})
    ? true
    : false
}