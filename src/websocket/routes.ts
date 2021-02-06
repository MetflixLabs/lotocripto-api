import { Timestamp } from 'bson'
import { io } from '../app'
import { uptimeHandler } from '../eventHandlers/uptimeHandler'

const userUptime = new Promise((resolve, reject) => {
  io.on('connection', socket => {
    const startTime = +new Date().toUTCString
    socket.on('disconnecting', () => {
      console.log(socket.rooms) // the Set contains at least the socket ID
    })

    socket.on('disconnect', () => {
      const endTime = +new Date().toUTCString()
      const connectedTime = uptimeHandler({ startTime, endTime })
      console.log()
    })
  })
})
