import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1212',
    database: 'auth-nestjs-nextjs_db',
    models: [User],
    autoLoadModels: true,
    define: {
      charset: 'utf-8',
      collate: 'utf-8_general_ci',
    }
  }),
    UserModule,
],
})
export class AppModule {}
