import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { bcryptHandler } from '../../../utils/bcryptHandler'
import { IUpdateUserRequestDTO } from './UpdateUserDTO'

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IUpdateUserRequestDTO): Promise<IOutputResult> {
    const { id, password: plainPassword } = data

    const hashPassword = plainPassword ? await bcryptHandler.encrypt(plainPassword) : undefined

    const newUserObject = {
      ...data,
      password: hashPassword
    }

    const wasUpdated = await this.userRepository.update(id, newUserObject)

    if (!wasUpdated) throw new Error(`Usuário id ${id} não encontrado.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `Dados de usuário atualizados com sucesso.`
      }
    })

    return outputResult
  }
}
