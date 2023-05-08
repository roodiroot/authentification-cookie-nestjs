import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ){}

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ){
        const hashPassword = await bcrypt.hashSync(password, 3)
        const user = await this.userService.create({
            name,
            email,
            password: hashPassword
        })
        return {id: user.id, name: user.name, email: user.email}
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) res: Response
    ){
        const user = await this.userService.findOne({where: {email}})
        if(!user){
            throw new BadRequestException('Такого email не зарегестрированно')
        }
        if(!await bcrypt.compare(password, user.password)){
            throw new BadRequestException('Не верный пароль пользователя')
        }

        const jwt = await this.jwtService.signAsync({id: user.id})
        res.cookie('jwt', jwt, {httpOnly: true})

        return {
            message: 'success'
        }
    }

    @Get('profile')
    async profile(
        @Req() req: Request
    ){
        try {
            const cookie = req.cookies['jwt']
            const data = await this.jwtService.verifyAsync(cookie)
            if(!data){
                throw new UnauthorizedException()
            }
            const user = await this.userService.findOne({where: {id: data.id}})
            return {id: user.id, name: user.name, email: user.email}
        } catch (e) {
            throw new UnauthorizedException()
        }

        
    }

    @Post('logout')
    async logout(
        @Res({passthrough: true}) res: Response
    ){
        res.clearCookie('jwt')
        return {
            message: 'success'
        }
    }
}
