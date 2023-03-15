import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto, @Query('role') role: string) {
    console.log({
      dto,
    });

    const validRoles = ['user', 'admin', 'moderator'];
    if (role && !validRoles.includes(role)) {
      return new BadRequestException('Invalid role');
    }

    return this.authService.signup(dto, role);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return this.authService.signin(dto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: { email: string }) {
    console.log(dto);
    return this.authService.sendPasswordResetEmail(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: { resetToken: string; password: string }) {
    return this.authService.resetPassword(dto.resetToken, dto.password);
  }
}
