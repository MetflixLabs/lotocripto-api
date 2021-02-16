export const uptimeHandler = (uptime: number): Date => {
  const diff = Date.now() - uptime
  const minDate = new Date(diff)

  return minDate
}
