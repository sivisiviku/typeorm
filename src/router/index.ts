import * as Router from 'koa-router'
import { readAll, create } from '../controller/index'

const router: Router = new Router()

router.get('/', readAll)
router.post('/', create)

export default router