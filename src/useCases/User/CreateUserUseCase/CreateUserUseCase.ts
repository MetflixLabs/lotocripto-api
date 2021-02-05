import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { UserFactory } from '../../../factories/UserFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<IOutputResult> {
    const { name, email, password } = data

    const newUser = UserFactory({
      name,
      email,
      password
    })

    const createdPrice = this.userRepository.create(newUser)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `A user with id ${(await createdPrice).id} was created`
      }
    })

    return outputResult
  }
}
