DROP DATABASE IF EXISTS appota;

-- Create the db
CREATE DATABASE appota;

-- Move into the db
\c appota

-- Create table if it doesn't already exist
CREATE TABLE IF NOT EXISTS User
(
  id serial PRIMARY KEY,
  username VARCHAR ( 50 ) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Product
(
  id serial PRIMARY KEY,
  product_name VARCHAR ( 50 ) UNIQUE NOT NULL,
  product_price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Product_transaction
(
  id serial PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  total_price INT NOT NULL,
  status INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(id);
  FOREIGN KEY (product_id) REFERENCES Product(id);
);

ALTER TABLE User OWNER to postgres;
ALTER TABLE Product OWNER to postgres;
ALTER TABLE Product_transaction OWNER to postgres;
