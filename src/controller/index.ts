import * as Koa from 'koa'
import { getRepository, Repository } from 'typeorm'
import Movie from '../entity/movie'

const readAll = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const movies = await repo.find()
    ctx.body = movies
}

const create = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const movie: Movie = repo.create(ctx.request.body)
    await repo.save(movie)
    ctx.body = movie
}

export {
    readAll,
    create
}