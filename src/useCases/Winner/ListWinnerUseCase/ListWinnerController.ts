import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { ListWinnerUseCase } from './ListWinnerUseCase'

export class ListWinnerController {
  constructor(private listWinnerUseCase: ListWinnerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const page = request.query.page?.toString()
    const limit = request.query.limit?.toString()

    try {
      const outputResult = await this.listWinnerUseCase.execute({ page, limit })

      return response.status(200).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Erro inesperado.'
        }
      })

      return response.status(400).json(outputResult)
    }
  }
}
