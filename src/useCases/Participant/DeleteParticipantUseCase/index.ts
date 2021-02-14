import { MongoDBParticipantRepository } from '../../../repositories/implementations/MongoDB/MongoDBParticipantRepository'
import { DeleteParticipantController } from './DeleteParticipantController'
import { DeleteParticipantUseCase } from './DeleteParticipantUseCase'

const mongoDBParticipantRepository = new MongoDBParticipantRepository()
const deleteParticipantUseCase = new DeleteParticipantUseCase(mongoDBParticipantRepository)
const deleteParticipantController = new DeleteParticipantController(deleteParticipantUseCase)

export { deleteParticipantController }
