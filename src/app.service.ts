import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return "I'm okay!";
  }

  private users: User[] = []; 

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }
}
