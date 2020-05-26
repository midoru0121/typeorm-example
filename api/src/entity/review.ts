import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "reviews" })
export class Review extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  storeId!: number;

  @Column()
  score!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;
}
