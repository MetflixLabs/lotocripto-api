import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { CreateParticipantUseCase } from './CreateParticipantUseCase'

export class CreateParticipantController {
  constructor(private createParticipantUseCase: CreateParticipantUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, socketId } = request.body
    const BOT_KEY = process.env.BOT_KEY
    const requestBotKey = request.cookies.bot_key
    const isBot = requestBotKey === BOT_KEY

    if (!isBot) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: 'Sem autorização para executar esse comando',
        },
      })

      return response.status(403).json(outputResult)
    }

    try {
      const outputResult = await this.createParticipantUseCase.execute({
        socketId,
        userId,
      })

      return response.status(201).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Erro inesperado.',
        },
      })

      return response.status(400).json(outputResult)
    }
  }
}
