"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const router = (0, express_1.Router)();
const ProductController = new ProductController_1.default();
router.get('/', ProductController.getAllProduct);
router.get('/search', ProductController.searchProduct);
router.delete('/:id', ProductController.deleteProductById);
router.put('/:id', ProductController.updateProductById);
exports.default = router;
//# sourceMappingURL=ProductRouter.js.map