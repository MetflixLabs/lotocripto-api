import { OmitReadonly } from 'mongoose'
import { IUser } from '../interfaces/IUser'
import { IUpdateUserRequestDTO } from '../useCases/User/UpdateUserUseCase/UpdateUserDTO'

export interface IUserRepository {
  create(price: IUser): Promise<IUser>
  update(id: any, user: IUser): Promise<IUser | null>
  // delete(id: unknown): Promise<unknown>
  // listAll(page: number, limit: number): Promise<IUser[] | null>
  findById(id: unknown): Promise<IUser | null>
  findByName(name: string, page: number, limit: number): Promise<IUser[] | null>
  // getCollectionLength(): Promise<number>
}
