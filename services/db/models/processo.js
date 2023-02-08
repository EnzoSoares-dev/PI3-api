import { DataTypes } from "sequelize"
import { Database } from "../connection.js"

export const processo = Database.define('Processos',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type:DataTypes.STRING
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    steps:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    empresaId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
