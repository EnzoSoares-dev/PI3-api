import { processo } from "../../db/models/processo.js"
export const insertProcesso = async (req,res)=>{
    const {body} = req
    const {empresaId} = req.params
    const process = {
        ...body,
        empresaId:empresaId
    }
    console.log(process)
    const result = await processo.create(process)
    result
    ?res.send(result)
    :res.send(false)
}