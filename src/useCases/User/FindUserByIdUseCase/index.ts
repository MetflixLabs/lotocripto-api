import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { FindUserByIdController } from './FindUserByIdController'
import { FindUserByIdUseCase } from './FindUserByIdUseCase'

const mongoDBUserRepository = new MongoDBUserRepository()
const findUserByIdUseCase = new FindUserByIdUseCase(mongoDBUserRepository)
const findUserByIdController = new FindUserByIdController(findUserByIdUseCase)

export { findUserByIdController }
