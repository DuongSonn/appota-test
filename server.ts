import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import productRouter from "./routers/ProductRouter";
import userRouter from "./routers/UserRouter";
import productTransactionRouter from "./routers/ProductTransactionRouter";
import pool from "./dbconfig/dbconnector";
import redisConnector from "./dbconfig/redisconnector";

class Server {
  private app;
	client;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
		this.client = redisConnector().init();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
  }

  private dbConnect() {
    pool.connect(function (err, client, done) {
      if (err) throw new Error(err);
      console.log("Connected");
    });
  }

  private routerConfig() {
    this.app.use("/products", productRouter);
    this.app.use("/users", userRouter);
    this.app.use("/product_transaction", productTransactionRouter);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

export default Server;
