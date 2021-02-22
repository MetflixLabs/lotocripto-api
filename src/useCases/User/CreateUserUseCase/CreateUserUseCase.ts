import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { UserFactory } from '../../../factories/UserFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { bcryptHandler } from '../../../utils/bcryptHandler'
import { validateCaptcha } from '../../../utils/validateCaptcha'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<IOutputResult> {
    const { name, email, password, walletAddress, captcha } = data

    const nameAlreadyRegistered = await this.userRepository.findByName(name)
    const mailAlreadyRegistered = await this.userRepository.findByEmail(email)
    const walletAlreadyRegistered = await this.userRepository.findByWallet(walletAddress)
    const isCaptchaValid = await validateCaptcha(captcha)

    // validations
    if (nameAlreadyRegistered) throw new Error(`O nome ${name} já está em uso.`)
    if (mailAlreadyRegistered) throw new Error(`O email ${email} já está em uso.`)
    if (walletAlreadyRegistered) throw new Error(`A carteira ${walletAddress} já está em uso.`)
    if (name.length > 8) throw new Error(`O nome de usuário deve ter entre 4-8 caracteres.`)
    if (!isCaptchaValid) throw new Error(`Falha ao verificar o reCAPTCHA. Tente novamente.`)

    const encryptedPassword = await bcryptHandler.encrypt(password)

    const newUser = UserFactory({
      name,
      email,
      password: encryptedPassword,
      walletAddress
    })

    const wasCreated = await this.userRepository.create(newUser)

    if (!wasCreated) throw new Error('Erro ao criar usuário.')

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `Sua conta foi criada com sucesso! Você pode entrar agora.`
      }
    })

    return outputResult
  }
}
