import { Router } from "express";
import { createUser, getUsersPosts } from './handlers'

export const router = Router()

router.get('/:id/posts', getUsersPosts)
router.post('/', createUser)