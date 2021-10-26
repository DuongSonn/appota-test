"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductTransactionController_1 = __importDefault(require("../controllers/ProductTransactionController"));
const router = (0, express_1.Router)();
const ProductTransactionController = new ProductTransactionController_1.default();
router.post('/', ProductTransactionController.CreateTransaction);
exports.default = router;
//# sourceMappingURL=ProductTransactionRouter.js.map