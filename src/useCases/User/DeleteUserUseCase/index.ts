import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import DeleteUserController from './DeleteUserController'
import DeleteUserUseCase from './DeleteUserUseCase'

const mongoDBUserRepositor = new MongoDBUserRepository()
const deleteUserUseCase = new DeleteUserUseCase(mongoDBUserRepositor)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserController }
