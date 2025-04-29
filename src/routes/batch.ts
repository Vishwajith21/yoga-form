import express from 'express'
import {createBatch, getBatch, getAllBatches, updateBatch} from '../controllers/BatchController'

const router = express.Router();

router.post('/',createBatch);
router.get('/:id',getBatch);
router.get('/',getAllBatches);
router.patch('/:id',updateBatch);


export default router;