import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./todo/todo.module";
import { PremierModule } from "./premier/premier.module";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [TodoModule, PremierModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
