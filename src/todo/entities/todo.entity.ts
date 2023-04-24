import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../../enums/todo-status.enum";
import { EntitySkeleton } from "../../common/entitySkeleton";

@Entity("todo")
export class TodoEntity extends EntitySkeleton {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: string;
}
