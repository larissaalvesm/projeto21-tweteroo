import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'All fields are required!' })
    username: string; 

    @IsString()
    @IsUrl()
    @IsNotEmpty({ message: 'All fields are required!' })
    avatar: string; 
  }