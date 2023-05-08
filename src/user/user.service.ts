import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User){}

    async create(data: any){
        return await this.userRepository.create(data)
    }

    async findOne(condition: any){
        return await this.userRepository.findOne(condition)
    }
}
