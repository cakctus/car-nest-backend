import { Module } from '@nestjs/common';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  controllers: [],
})
export class AuthModule {}
