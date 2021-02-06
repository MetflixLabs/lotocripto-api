export interface ICreateParticipantRequestDTO {
  id?: any
  userId: number
  socketId: string
  startDate: number
  elegible: boolean
  createdAt?: Date
  updatedAt?: Date
}
