import * as Router from 'koa-router'
import { readAll, readAllV2, readOne, create, createV2, update, readAllRent } from '../controller/index'
import { auth } from '../middleware/index'

const router: Router = new Router()

router.get('/', readAll)
router.get('/v2', readAllV2)
router.get('/read/:name', readOne)
router.post('/', create)
router.post('/v2', createV2)
router.put('/', update)
router.get('/read-all-rent', auth, readAllRent)

export default router