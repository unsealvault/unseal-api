import { Types } from "mongoose";
export declare class CreateLetterInput {
    userId?: string;
    recipientEmail: string;
    encryptedContent: string;
    deliverAt: Date;
    audience?: string;
    visibility?: string;
    authorName?: string;
    images?: string[];
    audio?: string[];
    videos?: string[];
    files?: string[];
    paymentId?: string;
}
export declare class LetterType {
    _id: Types.ObjectId;
    userId?: string;
    recipientEmail: string;
    encryptedContent: string;
    status: string;
    deliverAt: Date;
    audience: string;
    visibility: string;
    authorName?: string;
    images: string[];
    audio: string[];
    videos: string[];
    files: string[];
    createdAt: Date;
    paymentId?: string;
}
