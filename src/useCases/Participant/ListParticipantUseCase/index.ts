import { MongoDBParticipantRepository } from '../../../repositories/implementations/MongoDB/MongoDBParticipantRepository'
import { ListParticipantController } from './ListParticipantController'
import { ListParticipantUseCase } from './ListParticipantUseCase'

const mongoDBParticipantRepository = new MongoDBParticipantRepository()
const listParticipantUseCase = new ListParticipantUseCase(mongoDBParticipantRepository)
const listParticipantController = new ListParticipantController(listParticipantUseCase)

export { listParticipantController }
