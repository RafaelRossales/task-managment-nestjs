import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto'

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
    ){}

    public async signUp(authCreadentials:AuthCredentialsDto):Promise<void>{
        const { username, password } = authCreadentials;
        const user = this.userRepository.create({username,password});
        await this.userRepository.save(user)
    }

}
