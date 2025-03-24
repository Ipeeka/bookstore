import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { BooksModule } from 'src/Modules/Books/books.module';

@Module({
  imports: [BooksModule,NotificationService],
  providers: [],
  exports: [NotificationService],
})
export class NotificationModule {}
