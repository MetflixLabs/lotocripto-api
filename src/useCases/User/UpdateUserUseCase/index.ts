import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import UpdateUserController from './UpdateUserController'
import { UpdateUserUseCase } from './UpdateUserUseCase'

const mongoDBUserRepository = new MongoDBUserRepository()
const updateUserUseCase = new UpdateUserUseCase(mongoDBUserRepository)
const updateUserController = new UpdateUserController(updateUserUseCase)

export { updateUserController }
