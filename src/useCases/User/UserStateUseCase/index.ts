import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { UserStateController } from './UserStateController'
import { UserStateUseCase } from './UserStateUseCase'

const mongoDBUserRepository = new MongoDBUserRepository()
const userStateUseCase = new UserStateUseCase(mongoDBUserRepository)
const userStateController = new UserStateController(userStateUseCase)

export { userStateController }
