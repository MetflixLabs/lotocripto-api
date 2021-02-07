import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { ParticipantFactory } from '../../../factories/ParticipantFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'
import { ICreateParticipantRequestDTO } from './CreateParticipantDTO'

export class CreateParticipantUseCase {
  constructor(private pariticipantRepository: IParticipantRepository) {}

  async execute(data: ICreateParticipantRequestDTO): Promise<IOutputResult> {
    const { socketId, userId } = data

    const userAlreadyFarming = await this.pariticipantRepository.findByUserId(data.userId)
    const socketIdAlreadyInUse = await this.pariticipantRepository.findBySocketId(data.socketId)

    // validations
    if (userAlreadyFarming || socketIdAlreadyInUse)
      throw new Error(`Você já está conectado em outra aba do navegador.`)

    const newParticipant = ParticipantFactory({
      socketId,
      userId,
      startDate: Date.now()
    })

    const createdParticipant = await this.pariticipantRepository.create(newParticipant)

    if (!createdParticipant.id) throw new Error(`Erro ao registrar participante.`)

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `Você entrou na rodada! Aguarde para partiticipar do sorteio...`
      }
    })

    return outputResult
  }
}
