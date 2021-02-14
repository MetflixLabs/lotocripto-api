import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { OutputResultFactory } from '../factories/OutputResultFactory'
import jwt from 'jsonwebtoken'
import { IAuth } from '../interfaces/IAuth'

export function verifyJWT(request: Request, response: Response, next: NextFunction) {
  try {
    const SECRET = process.env.SECRET
    const token = request.headers['x-access-token']?.toString()

    if (!SECRET) throw new Error('Secret não especificadO nas variáveis de ambiente.')
    if (!token) throw new Error('Nenhum token válido.')

    jwt.verify(token, SECRET, (err, decoded: IAuth) => {
      if (err || !decoded) throw new Error('Token inválido.')

      // se tudo estiver ok, salva no request para uso posterior
      request.userId = decoded.userId
      next()
    })
  } catch (error) {
    const outputResult = OutputResultFactory({
      notification: {
        success: false,
        message: error.message || 'Erro inesperado.'
      }
    })

    return response.status(400).json(outputResult)
  }
}
