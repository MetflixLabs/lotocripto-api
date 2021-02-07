import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { CreateParticipantUseCase } from './CreateParticipantUseCase'

export class CreateParticipantController {
  constructor(private createParticipantUseCase: CreateParticipantUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, socketId } = request.body

    try {
      const outputResult = await this.createParticipantUseCase.execute({
        socketId,
        userId
      })

      return response.status(201).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Erro inesperado.'
        }
      })

      return response.status(401).json(outputResult)
    }
  }
}
