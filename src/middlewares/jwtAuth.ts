import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { OutputResultFactory } from '../factories/OutputResultFactory'
import jwt from 'jsonwebtoken'

export const jwtAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const SECRET = process.env.SECRET
    const token = request.cookies.token

    if (!SECRET) throw new Error('Secret não especificado nas variáveis de ambiente.')
    if (!token) throw new Error('Token não informado.')

    const decoded = jwt.verify(token, SECRET)

    if (!decoded) throw new Error('Token inválido.')

    next()
  } catch (error) {
    const outputResult = OutputResultFactory({
      notification: {
        success: false,
        message: error.message || 'Erro inesperado.'
      }
    })

    return response.status(401).json(outputResult)
  }
}
