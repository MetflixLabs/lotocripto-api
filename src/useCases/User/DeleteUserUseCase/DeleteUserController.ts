import { Request, Response } from 'express'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import DeleteUserUseCase from './DeleteUserUseCase'

export default class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body

    try {
      const outputResult = await this.deleteUserUseCase.execute({ id })

      return response.status(200).json(outputResult)
    } catch (error) {
      const outputResult = OutputResultFactory({
        notification: {
          success: false,
          message: error.message || 'Unexpected error.'
        }
      })

      return response.status(400).json(outputResult)
    }
  }
}
