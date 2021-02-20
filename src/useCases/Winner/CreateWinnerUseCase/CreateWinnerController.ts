import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { CreateWinnerUseCase } from './CreateWinnerUseCase'

export class CreateWinnerController {
  constructor(private createWinnerUseCase: CreateWinnerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, transactionId, userId } = request.body

    try {
      const outputResult = await this.createWinnerUseCase.execute({
        amount,
        userId,
        transactionId,
      })

      return response.status(201).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message,
        },
      })

      return response.status(400).json(outputResult)
    }
  }
}
