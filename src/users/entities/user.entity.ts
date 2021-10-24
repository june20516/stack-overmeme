import { Meme } from "src/memes/entities/meme.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid') id: number;
    
    @Column('varchar') email: string;

    @Column('varchar') nickName: string;

    //starredMeme: string[];

    @OneToMany(
        (type) => Meme,
        (meme) => meme.uploader
    )
    uploadedMemes: Meme[];
}
