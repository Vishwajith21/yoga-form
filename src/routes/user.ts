import express from 'express'
import UserFormValidation from '../middleware/user/UserValidations'
import {createUser, getUser, getAllUsers, updateUser, deleteUser, getUserByEmail} from '../controllers/UserController'
import {updateBatch} from "../controllers/BatchController"
import {createPayment, deletePayment} from "../controllers/PaymentController"
import { resourceLimits } from 'worker_threads'

const router = express.Router()

router.post('/',[UserFormValidation],createUser);
router.get('/:id', getUser)
router.get('/',getAllUsers);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);
router.get('/email/:id',getUserByEmail);

export default router;