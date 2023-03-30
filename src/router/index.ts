import * as Router from 'koa-router'
import { readAll } from '../controller/index'

const router: Router = new Router()

router.get('/', readAll)

export default router