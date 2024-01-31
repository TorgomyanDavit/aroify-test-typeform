CREATE DATABASE IF NOT EXISTS bankdb;

USE bankdb;

CREATE TABLE IF NOT EXISTS banks (
  bank_id INT PRIMARY KEY AUTO_INCREMENT,
  bankName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS currencies (
  currency_id INT PRIMARY KEY AUTO_INCREMENT,
  isoCode VARCHAR(3) NOT NULL,
  countryOrigin VARCHAR(255) NOT NULL,
  signCharacter VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
  account_id INT NOT NULL AUTO_INCREMENT,
  bank_id INT DEFAULT NULL,
  currency_id INT DEFAULT NULL,
  accountNumber VARCHAR(20) NOT NULL,
  accountName VARCHAR(255) NOT NULL,
  PRIMARY KEY (account_id),
  KEY bank_id (bank_id),
  KEY currency_id (currency_id),
  FOREIGN KEY (bank_id) REFERENCES banks (bank_id),
  FOREIGN KEY (currency_id) REFERENCES currencies (currency_id)
);

INSERT INTO banks (bankName) VALUES
  ('Bank A'),
  ('Bank B'),
  ('Bank C');