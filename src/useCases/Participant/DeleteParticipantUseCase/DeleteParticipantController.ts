import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { DeleteParticipantUseCase } from './DeleteParticipantUseCase'

export class DeleteParticipantController {
  constructor(private deleteParticipantUseCase: DeleteParticipantUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { socketId, userId } = request.body
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
      const outputResult = await this.deleteParticipantUseCase.execute({ socketId, userId })

      return response.status(200).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Unexpected error.',
        },
      })

      return response.status(400).json(outputResult)
    }
  }
}
