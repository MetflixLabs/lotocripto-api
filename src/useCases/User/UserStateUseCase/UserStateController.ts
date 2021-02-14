import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { UserStateUseCase } from './UserStateUseCase'

export class UserStateController {
  constructor(private userStateUseCase: UserStateUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const token = request.cookies.token
      const outputResult = await this.userStateUseCase.execute({ token })

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
