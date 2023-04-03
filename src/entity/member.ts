import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    OneToMany,
    Index
} from "typeorm"
import { BaseEntity } from './baseEntity'
import Rent from "./rent"

@Entity()
export default class Member extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column()
    name: string

    @Index()
    @Column()
    age: number

    @Index()
    @Column()
    @Generated("uuid")
    referral_code: string

    @OneToMany(type => Rent, rent => rent.member)
    rent: Rent[]
}