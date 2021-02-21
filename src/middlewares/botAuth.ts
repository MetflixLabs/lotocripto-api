import { NextFunction, Request, Response } from 'express'
import { OutputResultFactory } from '../factories/OutputResultFactory'

export const botAuth = (request: Request, response: Response, next: NextFunction) => {
  const BOT_KEY = process.env.BOT_KEY
  const requestBotKey = request.cookies.bot_key
  const isBot = requestBotKey === BOT_KEY

  if (!isBot) {
    const outputResult = OutputResultFactory({
      notification: {
        success: false,
        message: 'Sem autorização para executar esse comando.'
      }
    })

    return response.status(403).json(outputResult)
  }

  next()
}
