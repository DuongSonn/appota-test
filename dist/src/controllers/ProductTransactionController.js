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
class ProductTransactionController {
    CreateTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, product_id, price } = req.body;
                const status = 0;
                const client = yield dbconnector_1.default.connect();
                let sql = `INSERT INTO Product_transaction(user_id, product_id, price, status)`;
                sql += `VALUES (${user_id}, ${product_id}, ${price}, ${status})`;
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
exports.default = ProductTransactionController;
//# sourceMappingURL=ProductTransactionController.js.map