import { Request, Response } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'

export default class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const requestUser = request.body

    try {
      const outputResult = await this.updateUserUseCase.execute(requestUser)

      return response.status(200).json(outputResult)
    } catch (error) {
      return response.status(500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
