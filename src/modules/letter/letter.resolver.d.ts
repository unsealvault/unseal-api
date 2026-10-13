import { LetterService } from "./letter.service";
import { CreateLetterInput, LetterType } from "./dto/letter.input";
import { Letter } from "./letter.schema";
import { User } from "../user/user.schema";
export declare class LetterResolver {
    private readonly letterService;
    constructor(letterService: LetterService);
    getMyLetters(user: User): Promise<Letter[]>;
    sealLetter(input: CreateLetterInput, context: any): Promise<Letter>;
    getMyLetterById(_id: string): Promise<LetterType>;
}
