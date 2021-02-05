import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const mondoDBUserRepository = new MongoDBUserRepository()

const createUserUseCase = new CreateUserUseCase(mondoDBUserRepository)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
