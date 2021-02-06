import { IParticipant } from '../interfaces/IParticipant'

export interface IParticipantRepository {
  create(price: IParticipant): Promise<IParticipant>
  update(id: unknown, user: IParticipant): Promise<IParticipant | null>
  delete(id: unknown): Promise<unknown>
  listAll(page: number, limit: number): Promise<IParticipant[] | null>
  findById(id: unknown): Promise<IParticipant | null>
  findBySocketId(name: string): Promise<IParticipant | null>
  findByUserId(name: string): Promise<IParticipant | null>
  deleteAll(): Promise<unknown>
  getCollectionLength(): Promise<number>
}
