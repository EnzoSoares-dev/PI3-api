import { processo } from "../../db/models/processo.js"
import { getProcessoById } from "./get.js"

export const updateProcesso = async (req,res)=>{
    console.log('id: ',req.params.empresaId)
    let process = await getProcessoById(req.params.empresaId,req.params.processoId)

    console.log(req.body)
    const object = req.body
    console.log(object)
    object.map((changes) => {
        console.log('changes: ',changes.type)
        const change = changes
        process[change.type] = change.content
    })

    console.log(process)
    const updated = await processo.update(process, { where: { id: req.params.processoId, empresaId: req.params.empresaId } })
    updated
    ? res.send(updated)
    : res.send(false)
}