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
    getAllProductTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.body;
                const client = yield dbconnector_1.default.connect();
                let sql = `SELECT * FROM Product, Product_transaction WHERE Product_transaction.product_id =`;
                sql += `(SELECT DISTINCT(product_id) FROM Product_transaction WHERE user_id = ${user_id})`;
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
}
exports.default = ProductController;
//# sourceMappingURL=UserController.js.map