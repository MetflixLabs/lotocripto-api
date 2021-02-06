import { IParticipant } from '../interfaces/IParticipant'

export const ParticipantFactory = (props: IParticipant): IParticipant => {
  const newParticipant: IParticipant = {
    ...props,
    startDate: Date.now(),
    elegible: false
  }

  return newParticipant
}
