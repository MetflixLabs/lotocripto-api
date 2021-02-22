import express from 'express'
import { router } from './routes'
import mongoose from 'mongoose'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const app = express()

Sentry.init({
  dsn: process.env.SENTRY_KEY,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 0.5
})

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

const server = http.createServer(app)

app.use(
  cors({
    origin: ['https://lotocripto.com.br', 'https://server.lotocripto.com.br'],
    exposedHeaders: ['Set-Cookie'],
    credentials: true
  })
)
app.use(helmet())
app.use(express.json())
app.use('/api', router)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

export { server }
