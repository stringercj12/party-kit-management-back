import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import firebaseAdmin from 'firebase-admin'

const firebaseConfig = {
    apiKey: "AIzaSyDd0FMnLId6V-_YPK-jksqXGTy3sG-Dn1c",
    authDomain: "letmeask-nlw-12cd3.firebaseapp.com",
    databaseURL: "https://letmeask-nlw-12cd3-default-rtdb.firebaseio.com",
    projectId: "letmeask-nlw-12cd3",
    storageBucket: "letmeask-nlw-12cd3.firebasestorage.app",
    messagingSenderId: "950443986700",
    appId: "1:950443986700:web:2ad7a3d188dbb320ac8329"
};

@Injectable()
export class PreauthMiddleware implements NestMiddleware {

    private defaultApp: any;

    constructor() {
        this.defaultApp = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(firebaseConfig),
        })
    }

    use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.defaultApp.auth().verifyIdToken(token.replace('Bearer', '')).then(async (decodedToken) => {
                const user = {
                    email: decodedToken.email
                }
                req['user'] = user;
                next();
            }).catch((error) => {
                console.error(error);
                this.accessDenied(req.url, res)
            })
        } else {
            next();
        }

    }

    private accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied'
        })
    }
}

