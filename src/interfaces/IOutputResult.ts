import { IPagination } from './IPagination'

interface IOutputNotification {
  success: boolean
  message?: string
}

export interface IOutputResult {
  notification: IOutputNotification
  pagination?: IPagination
  data?: unknown
}
