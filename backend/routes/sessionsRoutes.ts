import express, { NextFunction, Request, Response } from 'express';
import { handleErrors } from './handleErrors';
import { PrismaClient } from '@prisma/client';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { defineStore } from 'pinia'


const prisma = new PrismaClient();
const router = express.Router();



  
/*
export const useSession = defineStore('session',  {
    state: () => ({
        sessionId: []
    }),
    getters: {
        productCount(state) {

        }
    }
});*/

router.post(
    '/',
    handleErrors(async (req: Request, res: Response) => {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email: req.body.email },
        });

        if (!user) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user?.password || ''
        );

        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

/*
        const store = useStore();
        const token = store.token;
*/
        // Create a new session for the user
        const session = await prisma.session.create({
            //data: { userid: user.id, id: uuid(), token: token }
            data: { userid: user.id, id: uuid() }
        });

        return res.status(201).send({ sessionId: session.id });
    })
);

router.delete(
    '/',
    handleErrors(async (req: Request, res: Response) => {
        // Get the session ID from the request cookies
        const sessionId = req.cookies.sessionId;

        if (!sessionId) {
            return res.status(401).send({ error: 'You are not logged in' });
        }

        // Delete the session from the database
        await prisma.session.delete({ where: { id: sessionId } });

        // Clear the session cookie
        res.clearCookie('sessionId');

        return res.status(200).send({ message: 'You have been logged out' });
    })
);


export default router;
