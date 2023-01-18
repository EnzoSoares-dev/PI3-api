import bcrypt from 'bcryptjs'

export const generateHashPassword = async (password)=>{
    return await bcrypt.hash(password, bcrypt.genSaltSync(8))
}