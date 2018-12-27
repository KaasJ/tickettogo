import * as jwt from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET || 'MYOWNSECRETTOKEN12345678910PLEASEDONTTELL'
const ttl = 3600 * 8 

interface JwtPayload {
  id: number
}

export const sign = (data: JwtPayload) =>
  jwt.sign(data, secret, { expiresIn: ttl })

export const verify = (token: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload
