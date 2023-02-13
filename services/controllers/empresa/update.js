import { empresa } from "../../db/models/empresa.js"
import { getEmpresaById } from "./get.js"
import { generateHashPassword } from "../../Auth/hash/generate.js"

export const updateEmpresa = async (req, res) => {
    console.log('id: ',req.params.empresaId)
    let user = await getEmpresaById(req.params.empresaId)

    console.log(req.body)
    const object = req.body
    console.log(object)
    object.map((changes) => {
        console.log('changes: ',changes.type)
        const change = changes
        if(change.type === 'password'){
            change.content = generateHashPassword(change.content)
            user[change.type] = change.content
        }
        user[change.type] = change.content
    })

    console.log(user)
    const updated = await empresa.update(user, { where: { id: req.params.empresaId } })
    updated
    ? res.send(updated)
    : res.send(false)
}