import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from 'src/apps/token/token.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from 'src/apps/auth/auth.middleware';

@Module({
  providers: [AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/users', method: RequestMethod.GET });
  }
}
