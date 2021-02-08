import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'
import { IUpdateParticipantRequestDTO } from './UpdateParticipantDTO'

export class UpdateParticipantUseCase {
  constructor(private participantRepository: IParticipantRepository) {}

  async execute(data: IUpdateParticipantRequestDTO): Promise<IOutputResult> {
    const { id, ...props } = data

    const updatedParticipant = await this.participantRepository.update(id, props)

    if (!updatedParticipant) throw new Error(`Participante id ${id} não encontrado`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `Dados de participante atualizados com sucesso.`
      }
    })

    return outputResult
  }
}
