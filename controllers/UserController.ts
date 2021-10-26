import pool from "../dbconfig/dbconnector";
import redisConnector from "../dbconfig/redisconnector";

class ProductController {
  public async getAllProductTransaction(req, res) {
    const clientRedis = redisConnector().getRedisClient();
    const userRedisKey = "user:products";

    try {
      return clientRedis.get(userRedisKey, async (error, products) => {
        if (products) {
          return res.json({ source: "cache", data: JSON.parse(products) });
        } else {
          const { user_id } = req.body;
          const client = await pool.connect();

          let sql = `SELECT * FROM Product JOIN`;
          sql += `(SELECT DISTINCT(product_id) FROM Product_transaction WHERE user_id = ${user_id}) as Temp ON Product.id = Temp.product_id`;
          const { rows } = await client.query(sql);
          const data = rows;

          clientRedis.setex(userRedisKey, 3600, JSON.stringify(data));

          client.release();

          return res.json({ source: "database", data: data });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

export default ProductController;
