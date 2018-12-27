import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne} from 'typeorm'
import Ticket from '../tickets/entity'
import User from '../users/entity'
import { MinLength, IsString } from 'class-validator';

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number
  
  @IsString()
  @MinLength(3)
  @Column('text', {nullable: false})
  text: string


  @ManyToOne(_ => Ticket, ticket => ticket.comments, {onDelete:'CASCADE'})
  ticket: Ticket

  @ManyToOne(_ => User, user => user.comments, {eager:true})
  user: User


  
  
}

