import { DataTypes } from "sequelize"
import { Database } from "../connection.js"
import { processo } from "./processo.js"

export const empresa = Database.define('Empresas',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CNPJ:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
})
