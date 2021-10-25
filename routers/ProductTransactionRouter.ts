import express, { Router } from 'express';
import productTransactionController from '../controllers/ProductTransactionController';

const router = Router();
const ProductTransactionController = new productTransactionController();

router.post('/', ProductTransactionController.CreateTransaction);

export default router;