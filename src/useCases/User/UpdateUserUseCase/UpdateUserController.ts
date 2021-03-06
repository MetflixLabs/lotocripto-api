import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { UpdateUserUseCase } from './UpdateUserUseCase'

export default class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const requestUser = request.body

    try {
      const outputResult = await this.updateUserUseCase.execute(requestUser)

      return response.status(200).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Erro inesperado.'
        }
      })

      return response.status(500).json(outputResult)
    }
  }
}
