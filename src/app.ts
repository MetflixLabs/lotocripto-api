import express from 'express'
import { router } from './routes'
import mongoose from 'mongoose'
import { Server as socketio } from 'socket.io'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const app = express()
const server = http.createServer(app)
const io = new socketio({ path: '/socketio' }).listen(server)

io.on('connect', socket => {
  socket.emit('message', `o pai ta on`)
})

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/api', router)

export { io, server }
