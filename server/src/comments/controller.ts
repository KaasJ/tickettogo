
import {JsonController, Post, HttpCode, Param, Body, CurrentUser, NotFoundError} from 'routing-controllers'

import Comment from './entity'
import User from '../users/entity'
import Ticket from '../tickets/entity'
import Event from '../events/entity'

@JsonController()
export default class CommentController {

  @Post('/events/:eventid/tickets/:ticketid')
  @HttpCode(201)
  async createComment(
    @Body() { text }: Comment,
    @Param('ticketid') ticketId: number,
    @Param('eventid') eventId: number,
    @CurrentUser() user: User,
  ) {
    const currentTicket = await Ticket.findOne({ where: { id: ticketId } })
    if (!currentTicket) throw new NotFoundError(`No Ticket found`)
    await Comment.create({
      text,
      user,
      ticket: currentTicket
    }).save()

    const eventNewComment = await Event.findOne({ where: { id: eventId } })
    if (!eventNewComment) throw new NotFoundError(`No Event found`)

    return eventNewComment
  }

}

