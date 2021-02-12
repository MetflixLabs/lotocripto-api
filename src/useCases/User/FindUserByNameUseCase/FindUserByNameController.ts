import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { FindUserByNameUseCase } from './FindUserByNameUseCase'

export class FindUserByNameController {
  constructor(private findUserByNameUseCase: FindUserByNameUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body

    try {
      const outputResult = await this.findUserByNameUseCase.execute({ name })

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
