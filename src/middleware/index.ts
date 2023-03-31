import * as Koa from 'koa'

const auth = async (ctx: Koa.Context, next: () => Promise<any>) => {
    ctx.userId = '1234'
    await next()
}

export {
    auth
}