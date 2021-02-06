import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'
import { ICreateParticipantRequestDTO } from './CreateParticipantDTO'

export class CreateParticipantUseCase {
  constructor(private pariticiparRepository: IParticipantRepository) {}

  async execute(data: ICreateParticipantRequestDTO): Promise<IOutputResult> {}
}
