import { UserFactory } from '../../../factories/UserFactory'
import { IUser } from '../../../interfaces/IUser'
import { UserDocument } from '../../../schemas/User'
import { IUserRepository } from '../../IUserRepository'

export class MongoDBUserRepository implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    const userDocument = await UserDocument.create(user)

    const createdPrice = UserFactory({
      id: userDocument._id,
      createdAt: userDocument.createdAt,
      name: userDocument.name,
      email: userDocument.name,
      password: userDocument.password,
      updatedAt: userDocument.updatedAt
    })

    return createdPrice
  }

  async findByName(name: string, page: number, limit: number): Promise<IUser[] | null> {
    const skip = (page - 1) * limit

    const userDocumentList = await UserDocument.find({ name }).skip(skip).limit(limit)

    if (userDocumentList.length === 0) return null

    const priceList = userDocumentList.map((userDocument: IUser) => {
      const foundPrice = UserFactory({
        id: userDocument.id,
        name: userDocument.name,
        email: userDocument.email,
        password: userDocument.password,
        createdAt: userDocument.createdAt ? userDocument.createdAt : undefined
      })

      return foundPrice
    })

    return priceList
  }

  async getCollectionLength(): Promise<number> {
    return await UserDocument.estimatedDocumentCount()
  }
}
