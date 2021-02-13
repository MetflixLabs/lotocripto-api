import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import LoginUseCase from './LoginUseCase'

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body

    try {
      const outputResult = await this.loginUseCase.execute({ name, password })

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
