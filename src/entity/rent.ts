import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    Index
} from "typeorm"
import { BaseEntity } from './baseEntity'
import Member from "./member"
import Movie from "./movie"

@Entity()
export default class Rent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column()
    status: string

    @Index()
    @Column({nullable: true})
    date_rent: Date

    @Index()
    @Column({nullable: true})
    date_return: Date

    @ManyToOne(type => Member, member => member.rent)
    member: Member

    @OneToOne(type => Movie) @JoinColumn()
    movie: Movie
}