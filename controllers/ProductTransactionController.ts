import pool from "../dbconfig/dbconnector";

class ProductTransactionController {
  public async CreateTransaction(req, res) {
    const { user_id, product_id, total_price } = req.body;
    const status = 0;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      try {
				let sql = `INSERT INTO Product_transaction(user_id, product_id, total_price, status)`;
				sql += `VALUES (${user_id}, ${product_id}, ${total_price}, ${status})`;
				const { rows } = await client.query(sql);
				const data = rows;

				await client.query('COMMIT');
				res.status(201).send(data);
      } catch (error) {
				await client.query('ROLLBACK');
        res.status(500).send(error);
      }
    } finally {
      client.release();
    }
  }
}

export default ProductTransactionController;
