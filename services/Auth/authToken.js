import Jwt from "jsonwebtoken"

export const validateAccessToken = (req,res,next) => {
    const secret = '1ee8aa2602ca4b6b2b4e3b654c22ceb161c492f7' 
    const token = req.headers.token

    Jwt.verify(token,secret)
    ? next()
    : res.send(false)
}