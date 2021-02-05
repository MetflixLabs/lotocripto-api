import { IOutputResult } from '../interfaces/IOutputResult'
import { IPagination } from '../interfaces/IPagination'

interface IOutputResultFactory {
  notification: {
    success: boolean
    message?: string
  }
  pagination?: Omit<IPagination, 'totalPages'>
  data?: unknown
}

export const OutputResultFactory = (data: IOutputResultFactory): IOutputResult => {
  if (data.pagination) {
    return {
      ...data,
      pagination: {
        ...data.pagination,
        totalPages: Math.ceil(data.pagination.totalRecords / data.pagination.limit)
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
