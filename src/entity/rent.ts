import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm"
import { BaseEntity } from './baseEntity'
import Member from "./member"

@Entity()
export default class Rent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: string

    @Column()
    date_rent: Date

    @Column()
    date_return: Date

    @ManyToOne(type => Member, member => member.rent)
    member: Member
}