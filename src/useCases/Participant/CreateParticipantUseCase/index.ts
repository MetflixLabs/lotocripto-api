import { MongoDBParticipantRepository } from '../../../repositories/implementations/MongoDB/MongoDBParticipantRepository'
import { CreateUserUseCase } from '../../User/CreateUserUseCase/CreateUserUseCase'
import { CreateParticipantController } from './CreateParticipantController'
import { CreateParticipantUseCase } from './CreateParticipantUseCase'

const mongoDBParticipantRepository = new MongoDBParticipantRepository()
const createParticipantUseCase = new CreateParticipantUseCase(mongoDBParticipantRepository)
const createParticipantController = new CreateParticipantController(createParticipantUseCase)

export { createParticipantController }
