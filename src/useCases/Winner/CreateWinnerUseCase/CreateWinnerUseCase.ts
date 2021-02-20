import { OutputResultFactory } from '../../../factories/OutputResultFactory'
import { WinnerFactory } from '../../../factories/WinnerFactory'
import { IOutputResult } from '../../../interfaces/IOutputResult'
import { IWinnerRepository } from '../../../repositories/IWinnerRepository'
import { ICreateWinnerRequestDTO } from './CreateWinnerDTO'

export class CreateWinnerUseCase {
  constructor(private winnerRepository: IWinnerRepository) {}

  async execute(data: ICreateWinnerRequestDTO): Promise<IOutputResult> {
    const { amount, transactionId, userId } = data

    const newWinner = WinnerFactory({
      amount,
      transactionId,
      userId,
    })

    const wasCreated = await this.winnerRepository.create(newWinner)

    if (!wasCreated) throw new Error('Erro ao criar usuário.')

    const outputResult = OutputResultFactory({
      notification: {
        success: true,
        message: `Winner adicionado a lista com sucesso!`,
      },
    })

    return outputResult
  }
}
