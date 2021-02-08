import { IOutputResult } from '../interfaces/IOutputResult'
import { pageAndLimitHandler } from '../utils/pageAndLimitHandler'

export const OutputResultFactory = (data: IOutputResult): IOutputResult => {
  const pageAndLimit = pageAndLimitHandler(data.pagination?.currentPage, data.pagination?.limit)
  const { page, limit } = pageAndLimit

  if (data.pagination) {
    return {
      ...data,
      pagination: {
        ...data.pagination,
        limit: limit,
        currentPage: page,
        totalPages: Math.ceil(data.pagination.totalRecords / limit)
      }
    }
  } else if (data.data) {
    return {
      notification: data.notification,
      data: data.data
    }
  } else {
    return {
      notification: data.notification
    }
  }
}
