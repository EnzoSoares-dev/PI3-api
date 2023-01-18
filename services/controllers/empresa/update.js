import { empresa } from "../../db/models/empresa.js"
import { getEmpresaById } from "./get.js"

export const updateEmpresa = async (req, res) => {
    let user = await getEmpresaById(req.params.empresaId)

    object.map((changes) => {
        user[changes.type] = changes.content
    })

    console.log(user)
    const updated = await empresa.update(user, { where: { id: id } })
    return updated
        ? true
        : false
}