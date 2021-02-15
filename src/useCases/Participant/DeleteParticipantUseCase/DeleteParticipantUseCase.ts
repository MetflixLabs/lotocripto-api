import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'
import { IDeleteParticipantRequestDTO } from './DeleteParticipantDTO'

export class DeleteParticipantUseCase {
  constructor(private participantRepository: IParticipantRepository) {}

  async execute(data: IDeleteParticipantRequestDTO): Promise<IOutputResult> {
    const { socketId, userId } = data

    let wasDeleted
    if (userId) {
      wasDeleted = await this.participantRepository.deleteByUserId(userId)
    } else if (socketId) {
      wasDeleted = await this.participantRepository.deleteBySocketId(socketId)
    } else {
      throw new Error('Informe o id do usuário ou o id do socket conectado.')
    }

    if (!wasDeleted) throw new Error(`Participante não encontrado.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `Participante excluído com sucesso.`
      }
    })

    return outputResult
  }
}
