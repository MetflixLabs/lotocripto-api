import 'dotenv/config'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { ILoginRequestDTO } from './LoginDTO'
import { bcryptHandler } from '../../../utils/bcryptHandler'
import jwt from 'jsonwebtoken'

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ILoginRequestDTO): Promise<string> {
    const { name, password: plainPassword } = data

    const userFound = await this.userRepository.findByName(name)
    if (!userFound?.password) throw new Error(`Nome de usuário não cadastrado.`)

    const { id, password: hashPassword } = userFound

    const isPasswordCorrect = await bcryptHandler.compare(plainPassword, hashPassword)

    if (!isPasswordCorrect) throw new Error(`Senha inválida.`)

    if (!process.env.SECRET) throw new Error(`Secret não especificado nas variáveis de ambiente.`)

    const SECRET = process.env.SECRET

    const token = jwt.sign({ userId: id }, SECRET, {})

    return token
  }
}
