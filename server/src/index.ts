import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import setupDatabase from './db'
import UserController from './users/controller'
import LoginController from './logins/controller'
import EventController from './events/controller'
import TicketController from './tickets/controller'
import CommentController from './comments/controller'
import { Action, BadRequestError } from 'routing-controllers'
import { verify } from './jwt';
import User from './users/entity'


const app = createKoaServer({
  cors: true,
  controllers: [
    CommentController,
    TicketController,
    EventController,
    UserController,
    LoginController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [, jwt] = header.split(' ')

      try {
        return !!(jwt && verify(jwt))
      }
      catch (err) {
        throw new BadRequestError(err)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [, jwt] = header.split(' ')

      if (jwt) {
        const { id } = verify(jwt)
        return User.findOne({ where: { id } })
      }
    }
    return undefined
  }
})

setupDatabase()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))