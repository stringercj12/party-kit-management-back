import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {

    listUsers(req: Request) {
        return [{
            user: req['user']
        }]
    }

    authenticateInGoogle(user: { email: string, password: string }) {
        if (!user.email || !user.password) {
            throw new Error('Informe email/senha válidos');
        }

    }
}
