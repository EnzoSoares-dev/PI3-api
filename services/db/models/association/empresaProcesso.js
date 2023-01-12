import { empresa } from "../empresa.js"
import { processo } from "../processo.js"

empresa.HasMany(processo)
processo.belongsTo(empresa,{foreinKey: 'empresaId'})