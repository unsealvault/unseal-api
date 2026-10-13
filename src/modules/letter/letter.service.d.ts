import { Model } from "mongoose";
import { Letter, LetterDocument } from "./letter.schema";
import { CreateLetterInput, LetterType } from "./dto/letter.input";
export declare class LetterService {
    private readonly letterModel;
    constructor(letterModel: Model<LetterDocument>);
    sealLetter(input: CreateLetterInput, clientIp: string): Promise<Letter>;
    getMyLetters(userId: string, userEmail?: string): Promise<Letter[]>;
    findById(_id: string): Promise<LetterType>;
    processDueLetters(): Promise<number>;
    getDueLetters(): Promise<LetterDocument[]>;
    markAsDelivered(id: string): Promise<void>;
}
