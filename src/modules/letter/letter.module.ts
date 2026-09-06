import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { LetterService } from './letter.service';
import { LetterResolver } from './letter.resolver';
import { Letter, LetterSchema } from './letter.schema';
import { DeliveryTask } from '../tasks/delivery.task';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Letter.name, schema: LetterSchema },
    ]),
  ],
  providers: [LetterService, LetterResolver, DeliveryTask, MailService],
  exports: [LetterService],
})
export class LetterModule {}