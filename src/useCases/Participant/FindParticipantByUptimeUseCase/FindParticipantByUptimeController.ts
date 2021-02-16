import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { FindParticipantByUptimeUseCase } from './FindParticipantByUptimeUseCase'

export class FindParticipantByUptimeController {
  constructor(private findParticipantByUptimeUseCase: FindParticipantByUptimeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { uptime } = request.body

    try {
      const outputResult = await this.findParticipantByUptimeUseCase.execute({ uptime })

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
