import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meme {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column('text') title: string;

  @ManyToOne(
      (type) => User,
      (user) => user.uploadedMemes
    )
  uploader: User;

  @CreateDateColumn()
  created: Date;

}
