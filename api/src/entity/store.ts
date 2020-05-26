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
  prefecture!: string;

  @Column()
  city!: string;

  @Column()
  address!: string;

  @Column()
  openingHours!: string;

  @Column()
  genre!: string;

  @Column()
  demaeLink!: string;

  @Column()
  uberLink!: string;
}
