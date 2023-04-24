import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class EntitySkeleton {
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn({ update: false })
  createdAt: Date;
}
