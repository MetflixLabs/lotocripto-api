import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { MongoDBWinnerRepository } from '../../../repositories/implementations/MongoDB/MongoDBWinnerRepository'
import { ListWinnerController } from './ListWinnerController'
import { ListWinnerUseCase } from './ListWinnerUseCase'

const mongoDBUserRepository = new MongoDBUserRepository()
const mongoDBWinnerRepository = new MongoDBWinnerRepository()

const listWinnerUseCase = new ListWinnerUseCase(mongoDBWinnerRepository, mongoDBUserRepository)

const listWinnerController = new ListWinnerController(listWinnerUseCase)

export { listWinnerController }
