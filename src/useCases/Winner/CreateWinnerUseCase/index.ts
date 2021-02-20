import { MongoDBWinnerRepository } from '../../../repositories/implementations/MongoDB/MongoDBWinnerRepository'
import { CreateWinnerUseCase } from './CreateWinnerUseCase'
import { CreateWinnerController } from './CreateWinnerController'

const mongoDBWinnerRepository = new MongoDBWinnerRepository()

const createWinnerUseCase = new CreateWinnerUseCase(mongoDBWinnerRepository)

const createWinnerController = new CreateWinnerController(createWinnerUseCase)

export { createWinnerController }
