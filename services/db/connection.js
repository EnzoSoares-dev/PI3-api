import Sequelize from "sequelize"

export const Database = new Sequelize(
    'enzo_database',
    'root',
    '123456',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3307'
    }
)

Database.authenticate().then(() => {
    console.log('Connection has been established successfully.')
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error)
 })