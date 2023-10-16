import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
// import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
// import ApiError from './errors/ApiError'
// import { academicSemisterRoutes } from './app/modules/academicSemister/academicSemister.route'
import routes from './app/routes'
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'
// import { Promise } from 'mongoose'
const app: Application = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app.use('/api/v1/users/', UserRoutes)
// app.use('/api/v1/academic-semisters/', academicSemisterRoutes)

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
// })

// global error handler
app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  })
  next()
})

// const academicSemister = {
//   code: '01',
//   year: '2025',
// }

// const testId = async () => {
//   const testId = await generateFacultyId()
//   console.log(testId)
// }

// testId()

export default app
