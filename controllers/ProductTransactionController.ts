import pool from '../dbconfig/dbconnector';

class ProductTransactionController {
  public async CreateTransaction(req, res) {
		try {
				const { user_id, product_id, price } = req.body;
				const status = 0;

				const client = await pool.connect();

				let sql = `INSERT INTO Product_transaction(user_id, product_id, price, status)`;
				sql += `VALUES (${user_id}, ${product_id}, ${price}, ${status})`;
				const { rows } = await client.query(sql);
				const data = rows;

				client.release();

				res.send(data);
		} catch (error) {
				res.status(500).send(error);
		}
  }
}

export default ProductTransactionController;