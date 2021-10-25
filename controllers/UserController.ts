import pool from '../dbconfig/dbconnector';

class ProductController {
  public async getAllProductTransaction(req, res) {
		try {
        const { user_id } = req.body
				const client = await pool.connect();

				let sql = `SELECT * FROM Product, Product_transaction WHERE Product_transaction.product_id =`;
        sql += `(SELECT DISTINCT(product_id) FROM Product_transaction WHERE user_id = ${user_id})`
				const { rows } = await client.query(sql);
				const data = rows;

				client.release();

				res.send(data);
		} catch (error) {
				res.status(500).send(error);
		}
  }
}

export default ProductController;