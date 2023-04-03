import * as Router from 'koa-router'
import { koaBody } from "koa-body"
import { 
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
} from '../controller/index'
import { auth } from '../middleware/index'

const router: Router = new Router()

router.get('/', readAll)
router.get('/v2', readAllV2)
router.get('/v3', readAllV3)
router.get('/read/:name', readOne)
router.post('/', create)
router.post('/v2', createV2)
router.put('/', update)
router.get('/read-all-rent', auth, readAllRent)
router.post('/upload-avatar', koaBody({
    formidable: {
        uploadDir: './uploads/avatar', 
        keepExtensions: true, 
        multiples: true,
    },
    multipart: true,
    urlencoded: true
}), uploadAvatar)
router.post('/import-data', koaBody({
    formidable: {
        uploadDir: './uploads/documents', 
        keepExtensions: true, 
        multiples: true,
    },
    multipart: true,
    urlencoded: true
}), importData)

export default router