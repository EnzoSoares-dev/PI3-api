import bcrypt from 'bcryptjs'

export const validateHashPassword = (password,hash)=>{
    return bcrypt.compareSync(password, hash)
}