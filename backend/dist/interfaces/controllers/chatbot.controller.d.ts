import { Request, Response } from 'express';
import { ChatbotService } from '../../application/services/ChatbotService';
export declare class ChatbotController {
    private chatbotService;
    constructor(chatbotService: ChatbotService);
    sendMessage(req: Request, res: Response): Promise<void>;
    getQuickReplies(req: Request, res: Response): Promise<void>;
    getInfo(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=chatbot.controller.d.ts.map