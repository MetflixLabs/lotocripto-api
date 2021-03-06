import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { FindParticipantByUptimeUseCase } from './FindParticipantByUptimeUseCase'

export class FindParticipantByUptimeController {
  constructor(private findParticipantByUptimeUseCase: FindParticipantByUptimeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const uptime = request.query.uptime?.toString()

    if (!uptime) throw new Error('Nenhum uptime foi informado.')

    try {
      const outputResult = await this.findParticipantByUptimeUseCase.execute({ uptime })

      console.log('[Find Participant by Uptime] Participant found! Returning it')

      return response.status(200).json(outputResult)
    } catch (error) {
      console.log(`[Find Participant by Uptime] Participant not found! Error: ${error}`)

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
