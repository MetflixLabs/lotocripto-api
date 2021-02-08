interface IPagination {
  currentPage?: number
  totalPages?: number
  limit?: number
  totalRecords: number
}

interface IOutputNotification {
  success: boolean
  message?: string
}

export interface IOutputResult {
  notification: IOutputNotification
  pagination?: IPagination
  data?: unknown
}
