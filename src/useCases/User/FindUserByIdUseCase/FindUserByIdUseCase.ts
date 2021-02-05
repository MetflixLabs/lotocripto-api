import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { IFindUserByIdRequestDTO } from './FindUserByIdDTO'

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IFindUserByIdRequestDTO): Promise<IOutputResult> {
    const { id } = data

    const userFound = await this.userRepository.findById(id)

    if (!userFound) throw new Error(`User id ${id} not found`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `User id ${id} was found`
      },
      data: userFound
    })

    return outputResult
  }
}
