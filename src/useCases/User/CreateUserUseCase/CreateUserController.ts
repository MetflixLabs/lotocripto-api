import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, walletAddress, captcha } = request.body
    try {
      const outputResult = await this.createUserUseCase.execute({
        name,
        email,
        password,
        walletAddress,
        captcha,
      })

      return response.status(201).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message,
        },
      })

      return response.status(500).json(outputResult)
    }
  }
}
