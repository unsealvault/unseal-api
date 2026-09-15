// src/letter/letter.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Letter, LetterDocument } from './letter.schema';
import { CreateLetterInput, LetterType } from './dto/letter.input';

@Injectable()
export class LetterService {
  constructor(
    @InjectModel(Letter.name) private readonly letterModel: Model<LetterDocument>,
  ) {}

  // Create sealLetter
async sealLetter(input: CreateLetterInput): Promise<Letter> {
    const newLetter = new this.letterModel({
      ...input,
      userId: input.userId ? new Types.ObjectId(input.userId) : undefined,
      status: 'sealed',
    });

    return newLetter.save();
  }

  async getMyLetters(userId: string, userEmail?: string): Promise<Letter[]> {
    const query: any = {
      $or: [{ userId: new Types.ObjectId(userId) }],
    };

    if (userEmail) {
      query.$or.push({ recipientEmail: userEmail.toLowerCase().trim() });
    }

    return this.letterModel.find(query).sort({ createdAt: -1 }).exec();
  }


  // 
  async findById(_id: string): Promise<LetterType> {
    
    // console.log("from service", _id)
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException('Invalid Letter ID format');
    }

    const result = await this.letterModel.findById(_id).exec();
    if (!result) {
      throw new NotFoundException('Letter not found in the vault');
    }

    return {
      ...result.toObject(),
      userId: result.userId?.toString(),
    } as LetterType;
  }

  // ৩. পাবলিক ভল্টের চিঠিগুলো নিয়ে আসা (উন্মুক্ত চিঠি প্রদর্শনের জন্য)
  // async getPublicLetters(): Promise<LetterType[]> {
  //   const docs = await this.letterModel
  //     .find({
  //       visibility: 'public_anonymous',
  //       status: 'delivered',
  //     })
  //     .sort({ createdAt: -1 })
  //     .limit(20)
  //     .exec();

  //     console.log(docs)
  //   // return docs.map((doc) => this.mapToLetterType(doc));
  // }






// Process due Letter
  async processDueLetters(): Promise<number> {
  const now = new Date();
  const result = await this.letterModel.updateMany(
    {
      status: 'sealed',
      deliverAt: { $lte: now },
    },
    {
      $set: { status: 'delivered' },
    }
  );

  return result.modifiedCount;
}

// get Due Letter
async getDueLetters(): Promise<LetterDocument[]> {
  const now = new Date();
  return this.letterModel
    .find({
      status: 'sealed',
      deliverAt: { $lte: now },
    })
    .exec();
}

// Marked As Delivered
async markAsDelivered(id: string): Promise<void> {
  await this.letterModel.findByIdAndUpdate(id, { status: 'delivered' }).exec();
}
}