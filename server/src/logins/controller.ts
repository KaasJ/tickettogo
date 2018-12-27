import { JsonController, BadRequestError, Post, Body} from 'routing-controllers'
import { IsString } from 'class-validator'
import User from '../users/entity'
import { sign } from '../jwt'



class AuthenticationPayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {

  @Post('/logins')
async authenticate(
  @Body() {email, password}: AuthenticationPayload
) {
  const user = await User.findOne({ where: { email } })
  if (!user) throw new BadRequestError('Incorrect credentials. Please try again')

  if (!await user.checkPassword(password)) 
  throw new BadRequestError('Incorrect credentials. Please try again')

  const jwt = sign({ id: user.id! })
  return { jwt }
}


}