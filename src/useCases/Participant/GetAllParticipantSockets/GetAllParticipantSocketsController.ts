import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { GetAllParticipantSocketsUseCase } from './GetAllParticipantSocketsUseCase'

export class GetAllParticipantSocketsController {
  constructor(private getAllParticipantSocketsUseCase: GetAllParticipantSocketsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const outputResult = await this.getAllParticipantSocketsUseCase.execute()

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
