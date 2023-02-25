import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PremierModule } from './premier/premier.module';

@Module({
  imports: [TodoModule, PremierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
