import { IWinner } from '../interfaces/IWinner'

export interface IWinnerRepository {
  create(price: IWinner): Promise<boolean>
  update(id: unknown, user: IWinner): Promise<boolean>
  delete(id: unknown): Promise<boolean>
  listAll(page: number, limit: number): Promise<IWinner[] | null>
  findById(id: unknown): Promise<IWinner | null>
  listByUserId(name: string): Promise<IWinner[] | null>
  getCollectionLength(): Promise<number>
}
