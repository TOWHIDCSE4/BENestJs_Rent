import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dtos/registrationDto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entties/user.entity';

@ApiTags("auth")
@Controller('user')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {

    }
    @Post('/register') 
    @UseInterceptors(ClassSerializerInterceptor)
    async register (@Body() body:RegistrationDto): Promise<User> {
        const {email, password, confirm_password} = body;
        const user = await this.userService.findByEmail(email);
        if(password!==confirm_password) throw new BadRequestException("Password does not match!")
        if(user) throw new BadRequestException("User already exists!");
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password,salt);
        const dataWithHashed = {
            ...body,
            password: hashedPassword,
        }
        const newUser = await this.authService.register(dataWithHashed);
        return this.userService.findByEmail(newUser.email);
    }
}
