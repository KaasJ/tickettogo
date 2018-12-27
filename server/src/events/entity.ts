import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import Ticket from '../tickets/entity'
import { MinLength, IsString } from 'class-validator';

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(3)
  @Column('text', {nullable: false})
  name: string

  @Column('json', {nullable: true})
  image: string

  @IsString()
  @Column('text', {nullable: false})
  description: string

  @Column('date', {nullable: false})
  startDate: Date

  @Column('int', {nullable: false})
  endDateInDays: number

  @Column('date', {nullable: false})
  endDate: Date

  @OneToMany(_ => Ticket, ticket => ticket.event, {eager:true})
  tickets: Ticket[]

}

