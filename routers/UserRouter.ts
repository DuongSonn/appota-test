import express, { Router } from 'express';
import userController from '../controllers/UserController';

const router = Router();
const UserController = new userController();

router.get('/product_transactions', UserController.getAllProductTransaction);

export default router;