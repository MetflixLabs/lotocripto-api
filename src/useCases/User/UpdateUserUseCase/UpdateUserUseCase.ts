import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { IUpdateUserRequestDTO } from './UpdateUserDTO'

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IUpdateUserRequestDTO): Promise<IOutputResult> {
    const { id, ...userRequest } = data

    const updatedUser = await this.userRepository.update(id, userRequest)

    if (!updatedUser) throw new Error(`User id ${id} not found.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `User id ${id} updated successfully.`
      }
    })

    return outputResult
  }
}
