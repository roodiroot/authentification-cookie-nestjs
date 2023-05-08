import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      // global: true,
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
  })
  ]
})
export class UserModule {}
