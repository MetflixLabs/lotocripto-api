import { Request, Response } from 'express'
import { ListParticipantUseCase } from './ListParticipantUseCase'

export class ListParticipantController {
  constructor(private listParticipantUseCase: ListParticipantUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const page = request.body.page
      const limit = request.body.limit

      const outputResult = await this.listParticipantUseCase.execute({ page, limit })

      return response.status(200).json(outputResult)
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
