import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany} from 'typeorm'
import Event from '../events/entity'
import User from '../users/entity'
import Comment from '../comments/entity'
import { MinLength, IsString } from 'class-validator';



@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('int', {nullable: false})
  price: number

  @IsString()
  @MinLength(3)
  @Column('text', {nullable: false})
  description: string

  @Column('text', {nullable: true})
  image: string

  @Column('int', {nullable:false})
  riskPercentage: number

  @ManyToOne(_ => Event, event => event.tickets, {onDelete:'CASCADE'})
  event: Event

  @ManyToOne(_ => User, user => user.tickets, {eager:true})
  user: User
  
  @OneToMany(_ => Comment, comment => comment.ticket, {eager:true})
  comments: Comment[]

}

