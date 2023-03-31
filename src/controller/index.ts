import * as Koa from 'koa'
import { getRepository, ILike, Repository } from 'typeorm'
import Movie from '../entity/movie'

const readAll = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const movies = await repo.find()
    ctx.body = movies
}

const readAllV2 = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const movies = await repo.query(`select * from movie`)
    ctx.body = movies
}

const readOne = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const movie = await repo.findBy({
        name: ILike(`%${ctx.params.name}%`)
    })
    ctx.body = movie
}

const create = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const movie: Movie = repo.create(ctx.request.body)
    await repo.save(movie)
    ctx.body = movie
}

const createV2 = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const movie = await repo.insert(ctx.request.body)
    ctx.body = movie
}

const update = async(ctx: Koa.Context) => {
    type reqBody = {
        id: string
        name: string
    }
    const { id, name } = ctx.request.body as reqBody;
    const repo: Repository<Movie> = getRepository(Movie)
    const movie = await repo.update(id, {name: name})
    ctx.body = movie
}

const readAllRent = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const rent = await repo.query(`select 
                                        rent.id as rent_id,
                                        movie.name as movie,
                                        rent.status, 
                                        rent.date_rent, 
                                        rent.date_return, 
                                        member.name, 
                                        member.age 
                                    from 
                                        rent 
                                    join 
                                        member 
                                    on 
                                        rent."memberId" = member.id
                                    join
                                        movie
                                    on
                                        rent."movieId" = movie.id`)
    ctx.body = {
        userId: ctx.userId,
        data: rent
    }
}

export {
    readAll,
    readAllV2,
    readOne,
    create,
    createV2,
    update,
    readAllRent
}