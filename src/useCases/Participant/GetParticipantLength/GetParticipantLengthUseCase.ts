import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'

export class GetParticipantLengthUseCase {
  constructor(private participantRepository: IParticipantRepository) {}

  async execute(): Promise<IOutputResult> {
    const length = await this.participantRepository.getCollectionLength()

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      data: length
    })

    return outputResult
  }
}
