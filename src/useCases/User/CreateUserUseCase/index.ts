import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const mongoDBPricesRepository = new MongoDBUserRepository()

const createPriceUseCase = new CreateUserUseCase(mongoDBPricesRepository)

const createPriceController = new CreateUserController(createPriceUseCase)

export { createPriceController }
