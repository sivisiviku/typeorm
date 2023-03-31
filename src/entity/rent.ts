import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm"
import { BaseEntity } from './baseEntity'
import Member from "./member"
import Movie from "./movie"

@Entity()
export default class Rent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: string

    @Column({nullable: true})
    date_rent: Date

    @Column({nullable: true})
    date_return: Date

    @ManyToOne(type => Member, member => member.rent)
    member: Member

    @OneToOne(type => Movie) @JoinColumn()
    movie: Movie
}