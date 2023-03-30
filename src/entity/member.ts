import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    OneToMany
} from "typeorm"
import { BaseEntity } from './baseEntity'
import Rent from "./rent"

@Entity()
export default class Member extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @Column()
    @Generated("uuid")
    referral_code: string

    @OneToMany(type => Rent, rent => rent.member)
    rent: Rent[]
}