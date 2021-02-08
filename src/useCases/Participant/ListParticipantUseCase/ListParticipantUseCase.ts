import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IParticipantRepository } from '../../../repositories/IParticipantRepository'
import { pageAndLimitHandler } from '../../../utils/pageAndLimitHandler'
import { IListParticipantRequestDTO } from './ListParticipantDTO'

export class ListParticipantUseCase {
  constructor(private participantRepository: IParticipantRepository) {}

  async execute(data: IListParticipantRequestDTO): Promise<IOutputResult> {
    const pageAndLimit = pageAndLimitHandler(data.page, data.limit)
    const { page, limit } = pageAndLimit

    const participantCollecionLenght = await this.participantRepository.getCollectionLength()

    if (participantCollecionLenght === 0) {
      const outputResult = OutputResultFactory({
        notification: {
          success: true,
          message: 'Nenhum registro encontrado.'
        }
      })

      return outputResult
    }

    const participantList = await this.participantRepository.listAll(page, limit)

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      pagination: {
        currentPage: page,
        limit,
        totalRecords: participantCollecionLenght
      },
      data: participantList
    })

    return outputResult
  }
}
