import { MongoDBParticipantRepository } from '../../../repositories/implementations/MongoDB/MongoDBParticipantRepository'
import { UpdatePariticipantController } from './UpdateParticipantController'
import { UpdateParticipantUseCase } from './UpdateParticipantUseCase'

const mongoDBParticipantRepository = new MongoDBParticipantRepository()
const updateParticipantUseCase = new UpdateParticipantUseCase(mongoDBParticipantRepository)
const updatePariticipantController = new UpdatePariticipantController(updateParticipantUseCase)

export { updatePariticipantController }
