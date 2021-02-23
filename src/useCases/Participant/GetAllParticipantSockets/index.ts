import { MongoDBParticipantRepository } from '../../../repositories/implementations/MongoDB/MongoDBParticipantRepository'
import { GetAllParticipantSocketsController } from './GetAllParticipantSocketsController'
import { GetAllParticipantSocketsUseCase } from './GetAllParticipantSocketsUseCase'

const mongoDBParticipantRepository = new MongoDBParticipantRepository()

const getAllParticipantSocketsUseCase = new GetAllParticipantSocketsUseCase(
  mongoDBParticipantRepository
)

const getAllParticipantSocketsController = new GetAllParticipantSocketsController(
  getAllParticipantSocketsUseCase
)

export { getAllParticipantSocketsController }
