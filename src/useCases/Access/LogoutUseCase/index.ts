import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { LogoutController } from './LogoutController'
import { LogoutUseCase } from './LogoutUseCase'

const mongoDBUserRepository = new MongoDBUserRepository()
const logoutUseCase = new LogoutUseCase(mongoDBUserRepository)
const logoutController = new LogoutController(logoutUseCase)

export { logoutController }
