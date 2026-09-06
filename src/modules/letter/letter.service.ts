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

  // ১. চিঠি সিল করা (নতুন চিঠি তৈরি ও স্টোর)
  async sealLetter(input: CreateLetterInput): Promise<LetterType> {
    const newLetter = new this.letterModel({
      recipientEmail: input.recipientEmail,
      encryptedContent: input.encryptedContent,
      deliverAt: input.deliverAt,
      audience: input.audience || 'self',
      visibility: input.visibility || 'private',
      authorName: input.authorName || 'Anonymous',
      mediaUrls: input.mediaUrls || [],
      status: 'sealed',
    });

    const savedDoc = await newLetter.save();
    return this.mapToLetterType(savedDoc);
  }

  // ২. আইডি দিয়ে নির্দিষ্ট চিঠি খোঁজা (আনসিল রিডার পেজের জন্য)
  async findById(id: string): Promise<LetterType> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid Letter ID format');
    }

    const doc = await this.letterModel.findById(id).exec();
    if (!doc) {
      throw new NotFoundException('Letter not found in the vault');
    }

    return this.mapToLetterType(doc);
  }

  // ৩. পাবলিক ভল্টের চিঠিগুলো নিয়ে আসা (উন্মুক্ত চিঠি প্রদর্শনের জন্য)
  async getPublicLetters(): Promise<LetterType[]> {
    const docs = await this.letterModel
      .find({
        visibility: 'public_anonymous',
        status: 'delivered',
      })
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();

    return docs.map((doc) => this.mapToLetterType(doc));
  }

  // Mongoose Document থেকে GraphQL LetterType ফরম্যাটে কনভার্ট করার মেথড
  private mapToLetterType(doc: LetterDocument): LetterType {
    return {
      id: doc._id.toString(),
      recipientEmail: doc.recipientEmail,
      encryptedContent: doc.encryptedContent,
      status: doc.status,
      deliverAt: doc.deliverAt,
      createdAt: (doc as any).createdAt || new Date(),
    };
  }


  async processDueLetters(): Promise<number> {
  const now = new Date();

  // সময় উত্তীর্ণ হওয়া চিঠিগুলো আপডেট
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

async getDueLetters(): Promise<LetterDocument[]> {
  const now = new Date();
  return this.letterModel
    .find({
      status: 'sealed',
      deliverAt: { $lte: now },
    })
    .exec();
}

async markAsDelivered(id: string): Promise<void> {
  await this.letterModel.findByIdAndUpdate(id, { status: 'delivered' }).exec();
}
}