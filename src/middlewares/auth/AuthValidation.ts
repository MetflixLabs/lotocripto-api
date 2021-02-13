import jwt from 'jsonwebtoken'
import { IAuthValidations } from './IAuthValidation'

export class AuthValidation {
  constructor(private SECRET: string | undefined) {}

  async validate(data: IAuthValidations): Promise<string> {
    const SECRET = this.SECRET

    const { authHeader } = data

    if (!authHeader) throw new Error('Header de autorização não informado.')

    const [bearer, token] = authHeader?.split(' ')
    const isHeaderValid = /^Bearer$/i.test(bearer)

    if (!SECRET) throw new Error('Secret não especificado nas variáveis de ambiente.')
    if (!isHeaderValid) throw new Error('Token mal formatado.')

    const decoded = jwt.verify(token, SECRET)

    if (!decoded) throw new Error('Token inválido.')

    return decoded.id
  }
}
