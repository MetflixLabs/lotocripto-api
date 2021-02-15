import express from 'express'
import { router } from './routes'
import mongoose from 'mongoose'
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

app.use(
  cors({
    origin: [
      'https://lotocripto.com.br',
      'http://localhost:8000',
      'http://localhost:4000',
      'https://server.lotocripto.com.br'
    ],
    exposedHeaders: ['Set-Cookie'],
    credentials: true
  })
)
app.use(helmet())
app.use(express.json())
app.use('/api', router)

export { server }
