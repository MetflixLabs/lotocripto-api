import { NextFunction, Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { LoginUseCase } from './LoginUseCase'

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction): Promise<unknown> {
    const { name, password } = request.body

    try {
      const token = await this.loginUseCase.execute({ name, password })
      const ENVIRONMENT = process.env.NODE_ENV

      if (ENVIRONMENT === 'development') {
        response.cookie('token', token)
      } else {
        response.cookie('token', token, { sameSite: 'none', secure: true })
      }

      const outputResult = OutputResultFactory({
        notification: {
          success: true,
          message: 'Login realizado com sucesso'
        }
      })

      return response.status(200).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Erro inesperado'
        }
      })

      return response.status(400).json(outputResult)
    }
  }
}
