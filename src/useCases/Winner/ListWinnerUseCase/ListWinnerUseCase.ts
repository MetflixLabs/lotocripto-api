import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { IWinnerRepository } from '../../../repositories/IWinnerRepository'
import { pageAndLimitHandler } from '../../../utils/pageAndLimitHandler'
import { IListWinnerRequestDTO } from './ListWinnerDTO'

export class ListWinnerUseCase {
  constructor(
    private winnerRepository: IWinnerRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: IListWinnerRequestDTO): Promise<IOutputResult> {
    const { page: pageRequest, limit: limitRequest } = data
    const { page, limit } = pageAndLimitHandler(pageRequest, limitRequest)

    const winnerCollectionLength = await this.winnerRepository.getCollectionLength()

    const winnersList = await this.winnerRepository.listAll(page, limit)

    if (!winnersList) throw new Error('Ainda não há ganhadores.')

    const winnerPromiseList = await Promise.all(
      winnersList.map(async winner => {
        const user = await this.userRepository.findById(winner.userId)

        const winnerWithName = {
          name: user?.name,
          date: winner.createdAt,
          transactionId: winner.transactionId,
          amount: winner.amount
        }

        return winnerWithName
      })
    )

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      pagination: {
        currentPage: page,
        limit,
        totalRecords: winnerCollectionLength
      },
      data: winnerPromiseList
    })

    return outputResult
  }
}
