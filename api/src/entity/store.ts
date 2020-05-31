import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Review } from "./review";

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

  // 一対多リレーション
  @OneToMany((_type) => Review, (review) => review.store)
  reviews!: Review[];
}
