import pool from '../dbconfig/dbconnector';

class ProductController {
  public async getAllProduct(req, res) {
		try {
				const client = await pool.connect();

				const sql = "SELECT * FROM Product";
				const { rows } = await client.query(sql);
				const data = rows;

				client.release();

				res.send(data);
		} catch (error) {
				res.status(500).send(error);
		}
  }

	public async deleteProductById(req, res) {
		try {
				const productId = req.params.id;
				const client = await pool.connect();

				const sql = `DELETE FROM Product WHERE id=${productId}`;
				const { rows } = await client.query(sql);
				const data = rows;

				client.release();

				res.send(data);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async updateProductById(req, res) {
		try {
			const productId = req.params.id;
			const { product_name, product_price } = req.body;
			const client = await pool.connect();

			const sql = `UPDATE Product SET product_name=${product_name}, product_price=${product_price} WHERE id=${productId}`;
			const { rows } = await client.query(sql);
			const data = rows;

			client.release();

			res.send(data);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async searchProduct(req, res) {
		try {
			
		} catch (error) {
			res.status(500).send(error);
		}
	}
}

export default ProductController;