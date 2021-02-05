import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { FindUserByIdUseCase } from './FindUserByIdUseCase'

export class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const id = request.body.id

    try {
      const outputResult = await this.findUserByIdUseCase.execute({ id })

      return response.status(200).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Unexpected error.'
        }
      })

      return response.status(400).json(outputResult)
    }
  }
}
