import { MongoDBParticipantRepository } from '../../../repositories/implementations/MongoDB/MongoDBParticipantRepository'
import { FindParticipantByUptimeController } from './FindParticipantByUptimeController'
import { FindParticipantByUptimeUseCase } from './FindParticipantByUptimeUseCase'

const mongoDBParticipantRepository = new MongoDBParticipantRepository()
const findParticipantByUptimeUseCase = new FindParticipantByUptimeUseCase(
  mongoDBParticipantRepository
)
const findParticipantByUptimeController = new FindParticipantByUptimeController(
  findParticipantByUptimeUseCase
)

export { findParticipantByUptimeController }
