import express from 'express'
import {createPayment, getPayment, getAllPayments, updatePayment, deletePayment} from '../controllers/PaymentController'
import { CheckBatchAndPrice } from '../middleware/payment/CheckBatchAndPrice';
import { MakePayment } from '../middleware/payment/MakePayment';
import { CheckExistingUser } from '../middleware/payment/CheckExistingUser';

const router = express.Router();

router.post('/', [CheckExistingUser,CheckBatchAndPrice,MakePayment],createPayment)
router.get('/:id',getPayment)
router.get('/',getAllPayments)
router.patch('/:id',[CheckBatchAndPrice],updatePayment)
router.delete('/:id',deletePayment)

export default router