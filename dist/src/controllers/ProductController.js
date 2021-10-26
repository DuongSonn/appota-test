"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnector_1 = __importDefault(require("../dbconfig/dbconnector"));
class ProductController {
    getAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield dbconnector_1.default.connect();
                const sql = "SELECT * FROM Product";
                const { rows } = yield client.query(sql);
                console.log(rows);
                const data = rows;
                client.release();
                res.send(data);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    deleteProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const client = yield dbconnector_1.default.connect();
                const sql = `DELETE FROM Product WHERE id=${productId}`;
                const { rows } = yield client.query(sql);
                const data = rows;
                client.release();
                res.send(data);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    updateProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const { product_name, product_price } = req.body;
                const client = yield dbconnector_1.default.connect();
                const sql = `UPDATE Product SET product_name=${product_name}, product_price=${product_price} WHERE id=${productId}`;
                const { rows } = yield client.query(sql);
                const data = rows;
                client.release();
                res.send(data);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    searchProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map