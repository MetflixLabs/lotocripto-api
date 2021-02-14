import { IUserRepository } from '../../../repositories/IUserRepository'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'

export class LogoutUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<IOutputResult> {
    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: 'Você saiu com sucesso'
      },
    })

    return outputResult
  }
}
