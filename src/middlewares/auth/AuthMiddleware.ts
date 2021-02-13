import { NextFunction, Request, Response } from 'express'
import { OutputResultFactory } from '../../factories/OutputResultFactory'
import { AuthValidation } from './AuthValidation'

export class AuthMiddleware {
  constructor(private authValidation: AuthValidation) {}

  async auth(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    const authHeader = request.headers.authorization

    try {
      const userId = await this.authValidation.validate({ authHeader })

      response.locals.userId = userId

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
}
