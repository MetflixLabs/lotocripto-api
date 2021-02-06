interface IUptimeHandler {
  startTime: number
  endTime: number
}

export const uptimeHandler = (props: IUptimeHandler): number => props.endTime - props.startTime
