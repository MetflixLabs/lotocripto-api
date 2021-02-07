import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { IFindUserByIdRequestDTO } from './FindUserByIdDTO'

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IFindUserByIdRequestDTO): Promise<IOutputResult> {
    const { id } = data

    const userFound = await this.userRepository.findById(id)

    if (!userFound) throw new Error(`Usuário id ${id} não encontrado.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      data: userFound
    })

    return outputResult
  }
}
