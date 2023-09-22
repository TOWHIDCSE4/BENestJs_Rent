import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entties/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async findByEmail (email: string): Promise<User> {
        return this.userRepository.findOne({where:{
            email:email
        }})
    }
}
