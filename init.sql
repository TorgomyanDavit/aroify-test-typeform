
CREATE DATABASE IF NOT EXISTS bankdb;
USE bankdb;

CREATE TABLE IF NOT EXISTS banks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS currencies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account_number VARCHAR(255) NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0.0,
  bank_id INT,
  currency_id INT,
  FOREIGN KEY (bank_id) REFERENCES banks(id),
  FOREIGN KEY (currency_id) REFERENCES Currency(id)
);

INSERT INTO banks (name) VALUES
  ('Bank A'),
  ('Bank B'),
  ('Bank C');