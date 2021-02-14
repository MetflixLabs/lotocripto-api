import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'
import { IDeleteParticipantRequestDTO } from './DeleteParticipantDTO'

export class DeleteParticipantUseCase {
  constructor(private participantRepository: IParticipantRepository) {}

  async execute(data: IDeleteParticipantRequestDTO): Promise<IOutputResult> {
    const { socketId } = data

    const wasDeleted = await this.participantRepository.deleteBySocketId(socketId)

    if (!wasDeleted) throw new Error(`Participante id ${socketId} não foi encontrado.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `Participante id ${socketId} excluído com sucesso.`
      }
    })

    return outputResult
  }
}
