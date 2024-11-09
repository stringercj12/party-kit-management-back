import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Get()
    list(@Req() req: Request) {
        return this.authService.listUsers(req)
    }
}
