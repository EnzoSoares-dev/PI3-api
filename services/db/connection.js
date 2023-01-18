import Sequelize from "sequelize"

export const Database = new Sequelize(
    'enzo_database',
    'root',
    'Qu3rop4st3l.',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
)

Database.authenticate().then(() => {
    console.log('Connection has been established successfully.')
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error)
 })