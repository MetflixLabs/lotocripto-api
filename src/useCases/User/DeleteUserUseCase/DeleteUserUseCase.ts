import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { IDeleteUserRequestDTO } from './DeleteUserDTO'

export default class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IDeleteUserRequestDTO): Promise<IOutputResult> {
    const { id } = data

    const wasDeleted = await this.userRepository.delete(id)

    if (!wasDeleted) throw new Error(`Usuário id ${id} não foi encontrado.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `Usuário id ${id} foi excluído com sucesso.`
      }
    })

    return outputResult
  }
}
