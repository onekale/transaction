import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity'

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1332',
      database: 'transaction',
      entities: [User],
      synchronize: true
    }), 
    UserModule
  ]
})
export class AppModule {}
