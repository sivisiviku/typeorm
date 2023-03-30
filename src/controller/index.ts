import * as Koa from 'koa'
import { getRepository, Repository } from 'typeorm'
import Movie from '../entity/movie'

const readAll = async(ctx: Koa.Context) => {
    const movieRepo: Repository<Movie> = getRepository(Movie)
    const movies = await movieRepo.find()
    ctx.body = movies
}

export {
    readAll
}