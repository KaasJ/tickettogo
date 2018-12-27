
import { JsonController, Post, HttpCode, Param, Get, Put, Body, Authorized, NotFoundError, QueryParam } from 'routing-controllers'


import Event from './entity'
import { MoreThan } from 'typeorm';


@JsonController()
export default class EventController {

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() {description, name, startDate, endDate, image}: Event
  ) {
    const event = await Event.create({
      description,
      name,
      startDate,
      endDate,
      endDateInDays: Math.ceil(Date.parse(endDate.toString())/8.64e7),
      image
    }).save()
    return event
  }

@Get('/events')
@HttpCode(200)
  async allEvents(
    @QueryParam('take') take : number,
    @QueryParam('skip') skip: number
  ) {
      const [events, count] = await Event.findAndCount({take, skip, order: {startDate: "ASC"}, where: {endDateInDays: MoreThan(Math.floor(Date.now()/8.64e7))}})
      if (!events) throw new NotFoundError(`No events found`)
      return {events, count}
  }

  @Get('/events/:id')
  @HttpCode(200)
  async getEvent(
      @Param('id') id: number
  ) {
      const event = await Event.findOne({where: {id}})
      if (!event) throw new NotFoundError(`No event found`)
      return event
  }

  @Put('/events/:id')
  @HttpCode(200)
  async updateEvent(
      @Param('id') id: number,
      @Body({ validate: { skipMissingProperties: true } }) {name, startDate, endDate, image}: Event
  ) {
      const event = await Event.findOne({where: {id}})
      if (!event) throw new NotFoundError('No event found')
      if (name) event.name = name
      if (startDate) event.startDate = startDate
      if (endDate) event.endDate = endDate
      if (image) event.image = image
      return event.save()
  }
}

