import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { FindUserByNameController } from './FindUserByNameController'
import { FindUserByNameUseCase } from './FindUserByNameUseCase'

const mongoDBUserRepository = new MongoDBUserRepository()
const findUserByNameUseCase = new FindUserByNameUseCase(mongoDBUserRepository)
const findUserByNameController = new FindUserByNameController(findUserByNameUseCase)

export { findUserByNameController }
