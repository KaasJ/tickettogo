import {
  JsonController, Post, HttpCode, Param, Put,
  Body,
  NotFoundError, Authorized, CurrentUser, Get
} from 'routing-controllers'

import Ticket from './entity'
import User from '../users/entity';
import Event from '../events/entity'
import { calculateInitialRiskPercentage } from './logic';


@JsonController()
export default class TicketController {

  @Authorized()
  @Post('/events/:id/tickets')
  @HttpCode(201)
  async createEventTicket(
    @CurrentUser() user: User,
    @Body() { price, description, image }: Ticket,
    @Param('id') id: number
  ) {
    const currentEvent = await Event.findOne({ where: { id } })
    await Ticket.create({
      user,
      event: currentEvent,
      price,
      description,
      image,
      riskPercentage: await calculateInitialRiskPercentage(user, currentEvent, price)
    }).save()
    const eventWithNewTicket = await Event.findOne({ where: { id } })
    return eventWithNewTicket
  }

  @Put('/events/:eventid/tickets/:ticketid')
  @HttpCode(200)
  async updateTicket(
    @Param('ticketid') ticketid: number,
    @Param('eventid') eventid: number,
    @Body({ validate: { skipMissingProperties: true } }) { event, price, description, image }: Ticket
  ) {
    const ticket = await Ticket.findOne({ where: { id: ticketid } })
    if (!ticket) throw new NotFoundError('No ticket found')
    if (event) ticket.event = event
    if (description) ticket.description = description
    if (price) ticket.price = price
    if (image) ticket.image = image
    await ticket.save()
    const eventWithUpdatedTicket = await Event.findOne({ where: { id: eventid } })
    return eventWithUpdatedTicket
  }


  @Get('/tickets')
  @HttpCode(200)
  async allTickets(
  ) {
    const tickets = await Ticket.find()
    if (!tickets) throw new NotFoundError(`No events found`)
    return tickets
  }

}

