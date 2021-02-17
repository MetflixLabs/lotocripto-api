import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { uptimeHandler } from '../../../utils/uptimeHandler'
import { IFindParticipantByUptimeRequestDTO } from './FindParticipantByUptimeDTO'

export class FindParticipantByUptimeUseCase {
  constructor(
    private participantRepository: IParticipantRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: IFindParticipantByUptimeRequestDTO): Promise<IOutputResult> {
    const { uptime } = data

    const minDate = uptimeHandler(uptime)

    const participantList = await this.participantRepository.findByUptime(minDate)

    if (!participantList) throw new Error('Nenhum participante elegível foi encontrado.')

    const random = Math.floor(Math.random() * participantList.length)
    const randomParticipant = participantList[random]

    const user = await this.userRepository.findById(randomParticipant.userId)

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      data: user
    })

    return outputResult
  }
}
