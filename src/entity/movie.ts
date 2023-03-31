import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column
} from 'typeorm'
import { BaseEntity } from './baseEntity'

@Entity()
export default class Movie extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    name: string

    @Column({type: 'int', nullable: true, width: 4})
    release_year: number

    @Column({type: 'int', nullable: true})
    rating: number
}