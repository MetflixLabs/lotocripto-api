import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { pageAndLimitHandler } from '../../../utils/pageAndLimitHandler'
import { IListUserRequestDTO } from './ListUserDTO'

export class ListUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IListUserRequestDTO): Promise<IOutputResult> {
    const pageAndLimit = pageAndLimitHandler(data.page, data.limit)
    const { page, limit } = pageAndLimit

    const userCollectionLength = await this.userRepository.getCollectionLength()

    if (userCollectionLength === 0) {
      const outputResult = OutputResultFactory({
        notification: {
          success: true,
          message: 'Empty table.'
        },
        pagination: {
          limit,
          currentPage: page,
          totalRecords: userCollectionLength
        },
        data: null
      })

      return outputResult
    }

    const userList = await this.userRepository.listAll(page, limit)

    const outputResult = OutputResultFactory({
      notification: {
        success: true
      },
      pagination: {
        currentPage: page,
        limit,
        totalRecords: userCollectionLength
      },
      data: userList
    })

    return outputResult
  }
}
