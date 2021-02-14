import { IUserRepository } from '../../../repositories/IUserRepository'
import { IUserStateRequestDTO } from './UserStateDTO'
import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import jwt from 'jsonwebtoken'

export class UserStateUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IUserStateRequestDTO): Promise<IOutputResult> {
    const { token } = data
    const SECRET = process.env.SECRET

    if (!SECRET) throw new Error('Secret não declarado nas variáveis de ambiente.')

    const decodedToken = jwt.verify(token, SECRET)

    const { userId } = JSON.parse(JSON.stringify(decodedToken))

    const userFound = await this.userRepository.findById(userId)
    if (!userFound) throw new Error(`Usuário não encontrado.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      data: userFound
    })

    return outputResult
  }
}
