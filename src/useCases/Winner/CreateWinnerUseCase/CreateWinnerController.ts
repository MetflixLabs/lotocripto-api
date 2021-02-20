import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { CreateWinnerUseCase } from './CreateWinnerUseCase'

export class CreateWinnerController {
  constructor(private createWinnerUseCase: CreateWinnerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, transactionId, userId } = request.body

    const BOT_KEY = process.env.BOT_KEY
    const requestBotKey = request.cookies.bot_key
    const isBot = requestBotKey === BOT_KEY

    if (!isBot) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: 'Sem autorização para executar esse comando'
        }
      })

      return response.status(403).json(outputResult)
    }

    try {
      const outputResult = await this.createWinnerUseCase.execute({
        amount,
        userId,
        transactionId
      })

      return response.status(201).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message
        }
      })

      return response.status(400).json(outputResult)
    }
  }
}
