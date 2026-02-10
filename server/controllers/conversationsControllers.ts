import type {Request, Response} from 'express'
import { getConversation, addConversation } from '../services/conversationService.ts'


export const getConversationController = async (req: Request, res: Response) => {
    const client = req.app.locals.client 

    try {
        const record = await getConversation(client, req.params.user1id, req.params.user2id)
        res.status(200).json({
            success: true,
            data: record,
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).json({
                success: false,
                message: e.message
            })
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message"
            })
        }
    } 
}


export const addConversationController = async (req: Request, res: Response) => {
    const client = req.app.locals.client

    try {
        const record = await addConversation(client, req.body.user1id, req.body.user2id)
        res.status(200).json({
            success: true,
            data: record,
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).json({
                success: false,
                message: e.message
            })
        } else {
            res.status(400).json({
                success: false,
                message: "couldn't get error message"
            })
        }
    } 

}
