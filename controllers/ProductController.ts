import pool from "../dbconfig/dbconnector";
import redisConnector from "../dbconfig/redisconnector";

class ProductController {
  public async getAllProduct(req, res) {
    try {
      const productsRedisKey = 'products';
      const clientRedis = redisConnector().getRedisClient();
      
      return clientRedis.get(productsRedisKey, async (error, products) => {
        if (products) {
          return res.json({ source: 'cache', data: JSON.parse(products) })
        } else {
          const client = await pool.connect();

          const sql = "SELECT * FROM Product";
          const { rows } = await client.query(sql);
          const data = rows;
          
          clientRedis.setex(productsRedisKey, 3600, JSON.stringify(data));

          client.release();

          return res.json({ source: 'database', data: data })
        }
      })
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async deleteProductById(req, res) {
    try {
      const productId = req.params.id;
      const client = await pool.connect();

      let sql = `SELECT id FROM Product_transaction WHERE product_id = ${productId} and status = 0`;
      const result = await client.query(sql);
      let data: any;
      if (result.rows.length > 0) {
        data = {
          message: 'This product is in a transaction'
        }
      } else {
        sql = `DELETE FROM Product WHERE id=${productId}`;
        const { rows } = await client.query(sql);
        data = rows;
      }
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

      const sql = `UPDATE Product SET product_name='${product_name}', product_price=${product_price} WHERE id=${productId}`;
      const { rows } = await client.query(sql);
      const data = rows;

      client.release();

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  public async searchProduct(req, res) {
    try {
			const product_name = req.query.name;
			const client = await pool.connect();

      const sql = `SELECT * FROM Product WHERE product_name LIKE '%${product_name}%'`;
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
