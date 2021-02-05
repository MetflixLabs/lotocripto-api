import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { IDeleteUserRequestDTO } from './DeleteUserDTO'

export default class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IDeleteUserRequestDTO): Promise<IOutputResult> {
    const { id } = data

    const wasDeleted = await this.userRepository.delete(id)

    if (!wasDeleted) throw new Error(`User id ${id} not found.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `User id ${id} was deleted.`
      }
    })

    return outputResult
  }
}
