import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { IFindUserByNameRequestDTO } from './FindUserByNameDTO'

export class FindUserByNameUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IFindUserByNameRequestDTO): Promise<IOutputResult> {
    const { name } = data

    const foundUser = await this.userRepository.findByName(name)

    if (!foundUser) throw new Error(`Nenhum usuário de nome '${name}' foi encontrado.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      data: foundUser
    })

    return outputResult
  }
}
