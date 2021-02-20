import { MongoDBParticipantRepository } from '../../../repositories/implementations/MongoDB/MongoDBParticipantRepository'
import { GetParticipantLengthController } from './GetParticipantLengthController'
import { GetParticipantLengthUseCase } from './GetParticipantLengthUseCase'

const mongoDBParticipantRepository = new MongoDBParticipantRepository()

const getParticipantLengthUseCase = new GetParticipantLengthUseCase(mongoDBParticipantRepository)

const getParticipantLengthController = new GetParticipantLengthController(
  getParticipantLengthUseCase
)

export { getParticipantLengthController }
