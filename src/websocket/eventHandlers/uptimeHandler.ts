import moment from 'moment'

interface IUptimeHandler {
  startTime: number
  endTime: number
}

export const uptimeHandler = (props: IUptimeHandler): number => {
  const startTime = moment(props.startTime)
  const endTime = moment(props.endTime)
  const diffInMinutes = startTime.diff(endTime, 'minutes')

  return diffInMinutes
}
