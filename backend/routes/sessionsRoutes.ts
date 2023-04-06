import express, { NextFunction, Request, Response } from 'express';
import { handleErrors } from './handleErrors';
import { PrismaClient } from '@prisma/client';
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

        /*export const useSession =  {
            state: () => ({
                sessionId: [session.id]
            }),
            getters: {
                productCount(state) {
                    return state.products.length
                }
            }
        }*/

        return res.status(201).send({ sessionId: session.id });
    })
);


export default router;
