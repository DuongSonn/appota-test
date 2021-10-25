import express, { Router } from 'express';
import productController from '../controllers/ProductController';

const router = Router();
const ProductController = new productController();

router.get('/', ProductController.getAllProduct);
router.get('/search', ProductController.searchProduct)
router.delete('/:id', ProductController.deleteProductById);
router.put('/:id', ProductController.updateProductById);

export default router;