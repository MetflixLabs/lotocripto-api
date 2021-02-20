import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { GetParticipantLengthUseCase } from './GetParticipantLengthUseCase'

export class GetParticipantLengthController {
  constructor(private getParticipantLengthUseCase: GetParticipantLengthUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const outputResult = await this.getParticipantLengthUseCase.execute()

      return response.status(200).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Erro inesperado.',
        },
      })

      return response.status(500).json(outputResult)
    }
  }
}
