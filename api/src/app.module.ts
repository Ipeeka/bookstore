import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Modules/Auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './Modules/User/user.module';
import { BooksModule } from './Modules/Books/books.module';
import { BookDetailsModule } from './Modules/BooksDetails/book-detail.module';
import { GeminiController } from './gemini/gemini.controller';
import { GeminiService } from './gemini/gemini.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    AuthModule,
    BooksModule,
    UserModule,
    BookDetailsModule,
    NotificationModule,
  ],
  controllers: [AppController, GeminiController],
  providers: [AppService, GeminiService],
})
export class AppModule {}
