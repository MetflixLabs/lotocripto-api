import { IUser } from '../interfaces/IUser'

export interface IUserRepository {
  create(price: IUser): Promise<boolean>
  update(id: unknown, user: IUser): Promise<boolean>
  delete(id: unknown): Promise<boolean>
  listAll(page: number, limit: number): Promise<IUser[] | null>
  findById(id: unknown): Promise<IUser | null>
  findByName(name: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
  getCollectionLength(): Promise<number>
  findByWallet(walletAddress: string): Promise<IUser | null>
}
