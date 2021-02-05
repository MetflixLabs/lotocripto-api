import { IUser } from '../interfaces/IUser'

export interface IUserRepository {
  create(price: IUser): Promise<IUser>
  update(id: unknown, user: IUser): Promise<IUser | null>
  delete(id: unknown): Promise<unknown>
  listAll(page: number, limit: number): Promise<IUser[] | null>
  findById(id: unknown): Promise<IUser | null>
  findByName(name: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
  // getCollectionLength(): Promise<number>
}
