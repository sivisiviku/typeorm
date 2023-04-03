import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    Index
} from 'typeorm'
import { BaseEntity } from './baseEntity'

@Entity()
export default class Movie extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Index()
    @Column({unique: true})
    name: string

    @Index()
    @Column({type: 'int', nullable: true, width: 4})
    release_year: number

    @Index()
    @Column({type: 'int', nullable: true})
    rating: number
}