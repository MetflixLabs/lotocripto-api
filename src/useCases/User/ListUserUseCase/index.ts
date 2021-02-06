import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { ListUserController } from './ListUserController'
import { ListUserUseCase } from './ListUserUseCase'

const mongoDBUserRepository = new MongoDBUserRepository()
const listUserUseCase = new ListUserUseCase(mongoDBUserRepository)
const listUserController = new ListUserController(listUserUseCase)

export { listUserController }
