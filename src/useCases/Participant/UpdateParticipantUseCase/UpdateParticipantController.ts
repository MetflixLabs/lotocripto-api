import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { UpdateParticipantUseCase } from './UpdateParticipantUseCase'

export class UpdatePariticipantController {
  constructor(private updateParticipantUseCase: UpdateParticipantUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const requestParticipant = request.body

    try {
      const outputResult = await this.updateParticipantUseCase.execute(requestParticipant)

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
