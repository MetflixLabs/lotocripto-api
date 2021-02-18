export const uptimeHandler = (uptime: string | number): Date => {
  const internalUptime = typeof uptime === 'string' ? parseFloat(uptime) : uptime

  const diff = Date.now() - internalUptime
  const minDate = new Date(diff)

  return minDate
}
