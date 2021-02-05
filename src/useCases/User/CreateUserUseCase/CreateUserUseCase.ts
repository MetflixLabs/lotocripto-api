import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { UserFactory } from '../../../factories/UserFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<IOutputResult> {
    const { name, email, password, walletAddress } = data

    const nameAlreadyRegistered = await this.userRepository.findByName(name)
    const mailAlreadyRegistered = await this.userRepository.findByEmail(email)

    if (nameAlreadyRegistered) throw new Error(`A user with name ${name} is already registered.`)
    if (mailAlreadyRegistered) throw new Error(`A user with email ${email} is already registered.`)

    const newUser = UserFactory({
      name,
      email,
      password,
      walletAddress
    })

    const createdUser = await this.userRepository.create(newUser)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `A user with id ${createdUser.id} was created`
      }
    })

    return outputResult
  }
}
