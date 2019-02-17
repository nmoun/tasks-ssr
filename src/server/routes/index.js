import express from 'express'
import passport from 'passport'
import clientRouter from './client'
import taskRouter from './tasks'
import articleRouter from './articles'
import authRouter from './auth'
import orderRouter from './orders'
import supplierRouter from './suppliers'

const router = express.Router()
router.get('/', clientRouter)
router.use('/api', authRouter)
router.use('/api/tasks', passport.authenticate('jwt', {session: false}), taskRouter)
router.use('/api/articles', passport.authenticate('jwt', {session: false}), articleRouter)
router.use('/api/order', passport.authenticate('jwt', {session: false}), orderRouter)
router.use('/api/suppliers', passport.authenticate('jwt', {session: false}), supplierRouter)

module.exports = router