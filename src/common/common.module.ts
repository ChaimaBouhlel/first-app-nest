import { Global, Module } from "@nestjs/common";
import { v4 } from "uuid";

const provider = {
  provide: "uuid",
  useValue: v4,
};

@Global()
@Module({
  providers: [provider],
  exports: [provider],
})
export class CommonModule {}
