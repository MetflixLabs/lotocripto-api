import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { LoginController } from './LoginController'
import { LoginUseCase } from './LoginUseCase'

const mongoDBUserRepository = new MongoDBUserRepository()
const loginUseCase = new LoginUseCase(mongoDBUserRepository)
const loginController = new LoginController(loginUseCase)

export { loginController }
