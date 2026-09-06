import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LetterDocument = Letter & Document;

@Schema({ timestamps: true })
export class Letter {
  @Prop({ required: true })
  recipientEmail!: string; 

  @Prop({ required: true })
  encryptedContent!: string; 

  @Prop({ required: true })
  deliverAt!: Date; 

  @Prop({ default: 'self' })
  audience!: string;

  @Prop({ default: 'private' })
  visibility!: string;

  @Prop({ default: 'Anonymous' })
  authorName?: string;

  @Prop({ type: [String], default: [] })
  mediaUrls!: string[];

  @Prop({
    type: String,
    enum: ['pending_verification', 'sealed', 'delivered'],
    default: 'pending_verification',
  })
  status!: string;

  @Prop()
  verificationToken?: string;
}

export const LetterSchema = SchemaFactory.createForClass(Letter);