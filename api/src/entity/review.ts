import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Store } from "src/entity/store";

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

  @ManyToOne((_type) => Store, (store) => store.reviews)
  @JoinColumn({ name: "storeId" })
  store!: Store;
}
