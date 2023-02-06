import { empresa } from "../../db/models/empresa.js"
import { getEmpresaById } from "./get.js"

export const updateEmpresa = async (req, res) => {
    console.log(req.params.empresaId)
    let user = await getEmpresaById(req.params.empresaId)

    req.body.object.map((changes) => {
        const change = JSON.parse(changes)
        user[change.type] = change.content
    })

    console.log(user)
    const updated = await empresa.update(user, { where: { id: req.params.empresaId } })
    updated
    ? res.send(updated)
    : res.send(false)
}
export const updateEmpresaPassword = async (req,res)=>{
    let user = await getEmpresaById(req.params.empresaId)
}