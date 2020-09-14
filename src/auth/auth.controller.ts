import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  UseGuards,
  Get,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './utils/get-user.decorator';
import { User } from './user.entity';

@ApiTags('auth')
@Controller('auth')
// @UseGuards(AuthGuard()) // for all routes
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private authService: AuthService) {}

  // Create a new User
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    this.logger.verbose(
      `signUp(): Creating a new User with username: ${authCredentialsDto.username}`,
    );

    return this.authService.signUp(authCredentialsDto);
  }

  // Authenticate User
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `signIn(): Logging a User in with username: ${authCredentialsDto.username}`,
    );

    return this.authService.signIn(authCredentialsDto);
  }

  // Testing - Log Incoming Req
  @ApiBearerAuth()
  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req): void {
    console.log('\nAuthController.test() triggered -->');
    console.log(req);
  }

  // Testing - Extract User from Req and Log
  @ApiBearerAuth()
  @Get('/test2')
  @UseGuards(AuthGuard())
  test2(@GetUser() user: User): void {
    console.log('\nAuthController.test2() triggered -->');
    console.log(user);
  }
}
