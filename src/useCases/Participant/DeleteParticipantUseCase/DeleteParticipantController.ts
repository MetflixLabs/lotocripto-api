import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { DeleteParticipantUseCase } from './DeleteParticipantUseCase'

export class DeleteParticipantController {
  constructor(private deleteParticipantUseCase: DeleteParticipantUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { socketId, userId } = request.body

    try {
      const outputResult = await this.deleteParticipantUseCase.execute({ socketId, userId })

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
