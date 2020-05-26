import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "stores" })
export class Store extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  score!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  genre!: string;
}
