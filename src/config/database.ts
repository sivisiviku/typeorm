import 'reflect-metadata'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import Movie from '../entity/movie'
import Member from '../entity/member'
import Rent from '../entity/rent'

const connectionOpts: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'psql1234',
    database: process.env.DB_NAME || 'typescript-koa',
    entities: [ Movie, Member, Rent ],
    synchronize: true
}

const connection: Promise<Connection> = createConnection(connectionOpts)

export default connection