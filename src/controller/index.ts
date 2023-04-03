import * as Koa from 'koa'
import { getRepository, ILike, Repository } from 'typeorm'
import { Workbook } from "exceljs";
import Movie from '../entity/movie'
import Member from '../entity/member'

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

const readAllV3 = async(ctx: Koa.Context) => {
    const repo: Repository<Movie> = getRepository(Movie)
    const limit = Number(ctx.request.query.limit)
    const offset = (Number(ctx.request.query.page) - 1) * limit
    const movies = await repo.createQueryBuilder(`movie`)
        .where(`movie.rating = :rating`, {rating: ctx.request.query.rating})
        .orderBy(`movie.release_year`)
        .limit(limit)
        .offset(offset)
        .getMany()
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
    
    type result = {
        rent_id: number,
        movie: string,
        status: string,
        date_rent: string,
        date_return: string,
        name: string,
        age: number
    }
    const workbook = new Workbook()
    const sheet = workbook.addWorksheet("rent")
    sheet.columns = [
        { header: "Rent ID", key: "rent_id" },
        { header: "Movie", key: "movie" },
        { header: "Status", key: "status" },
        { header: "Date Rent", key: "date_rent" },
        { header: "Date Return", key: "date_return" },
        { header: "Name", key: "name" },
        { header: "Age", key: "age" },
    ];
    await rent.map((value: result) => {
        sheet.addRow({
            rent_id: value.rent_id,
            movie: value.movie,
            status: value.status,
            date_rent: value.date_rent,
            date_return: value.date_return,
            name: value.name,
            age: value.age
        });
    });

    ctx.body = {
        userId: ctx.userId,
        data: rent
    }

    ctx.set("ContentType", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    ctx.set("Content-Disposition", "attachment;filename=" + "customers.xlsx");
    await workbook.xlsx.write(ctx.res);
}

const uploadAvatar = async(ctx: Koa.Context) => {
    ctx.body = ctx.request.files
}

const importData = async(ctx: Koa.Context) => {
    const repo: Repository<Member> = getRepository(Member)
    const file = JSON.stringify(ctx.request.files.documents)
    const filepath = JSON.parse(file).filepath
    const workbook = new Workbook()
    workbook.xlsx.readFile(filepath).then(() => {
        let worksheet = workbook.getWorksheet('Sheet1');
        worksheet.eachRow({includeEmpty: true}, (row, rowNumber) => {
            const values = JSON.parse(JSON.stringify(row.values));
            if(rowNumber > 1) {
                repo.insert({
                    deleted: values[1],
                    name: values[2],
                    age: values[3],
                })
            } 
        })
    })
    ctx.body = filepath
}

export {
    readAll,
    readAllV2,
    readAllV3,
    readOne,
    create,
    createV2,
    update,
    readAllRent,
    uploadAvatar,
    importData
}