import { IParticipant } from '../interfaces/IParticipant'

export interface IParticipantRepository {
  create(price: IParticipant): Promise<IParticipant>
  update(id: unknown, participant: Omit<IParticipant, 'startedAt'>): Promise<IParticipant | null>
  deleteBySocketId(socketId: string): Promise<boolean>
  deleteByUserId(socketId: string): Promise<boolean>
  listAll(page: number, limit: number): Promise<IParticipant[] | null>
  findById(id: unknown): Promise<IParticipant | null>
  findBySocketId(name: string): Promise<IParticipant | null>
  findByUserId(name: string): Promise<IParticipant | null>
  findByUptime(minDate: Date): Promise<IParticipant[] | null>
  deleteAll(): Promise<unknown>
  getCollectionLength(): Promise<number>
}
