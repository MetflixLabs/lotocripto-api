import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'

export class GetAllParticipantSocketsUseCase {
  constructor(private participantRepository: IParticipantRepository) {}

  async execute(): Promise<IOutputResult> {
    const length = await this.participantRepository.getAllSockets()

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      data: length
    })

    return outputResult
  }
}
