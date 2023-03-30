import * as Koa from "koa"
import * as HttpStatus from "http-status-codes"
import * as bodyParser from "koa-bodyparser"
import router from "./router/index"
import database from './config/database'

const app: Koa = new Koa()

app.use(bodyParser())
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        await next()
    } catch (error) {
        ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR
        error.status = ctx.status
        ctx.app.emit('error', error, ctx)
    }
})
app.use(router.routes())
app.use(router.allowedMethods())
app.on('error', console.error)

database.then(() => app.listen(3000, () => {
    console.log('Server running on port 3000')
})).catch(console.error)