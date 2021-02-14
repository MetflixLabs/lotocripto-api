import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { LogoutUseCase } from './LogoutUseCase'

export class LogoutController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const outputResult = await this.logoutUseCase.execute()
      const ENVIRONMENT = process.env.NODE_ENV

      if (ENVIRONMENT === 'development') {
        response.cookie('token', '', { expires: new Date(Date.now()) })
      } else {
        response.cookie('token', '', { sameSite: 'none', secure: true })
      }

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
