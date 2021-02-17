import { MongoDBParticipantRepository } from '../../../repositories/implementations/MongoDB/MongoDBParticipantRepository'
import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/MongoDBUserRepository'
import { FindParticipantByUptimeController } from './FindParticipantByUptimeController'
import { FindParticipantByUptimeUseCase } from './FindParticipantByUptimeUseCase'

const mongoDBParticipantRepository = new MongoDBParticipantRepository()
const mongoDBUserRepository = new MongoDBUserRepository()

const findParticipantByUptimeUseCase = new FindParticipantByUptimeUseCase(
  mongoDBParticipantRepository,
  mongoDBUserRepository
)

const findParticipantByUptimeController = new FindParticipantByUptimeController(
  findParticipantByUptimeUseCase
)

export { findParticipantByUptimeController }
