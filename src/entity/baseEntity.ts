import {
    CreateDateColumn,
    UpdateDateColumn,
    Column
} from "typeorm"

export class BaseEntity {
    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @Column()
    deleted: boolean
}