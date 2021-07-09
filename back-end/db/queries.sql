CREATE DATABASE IF NOT EXISTS dairydash;
USE dairydash;

CREATE TABLE IF NOT EXISTS region (
    name VARCHAR(255), 
    PRIMARY KEY (name)
);
CREATE TABLE IF NOT EXISTS  distributor (
    did INT AUTO_INCREMENT, 
    name VARCHAR(255), 
    phone CHAR(10) UNIQUE, 
    region VARCHAR(255) UNIQUE, 
    password VARCHAR(255), 
    PRIMARY KEY (did), 
    FOREIGN KEY (region) REFERENCES region (name)
);
CREATE TABLE IF NOT EXISTS retailer (
    rid INT AUTO_INCREMENT, 
    name VARCHAR(255), 
    phone CHAR(10) UNIQUE, 
    region VARCHAR(255), 
    password VARCHAR(255), 
    PRIMARY KEY (rid), 
    FOREIGN KEY (region) REFERENCES distributor (region)
);

INSERT IGNORE INTO region (name) VALUES ("Palayam"), ("Pattom"), ("Kazhakkoottam"), ("Sreekaryam");

CREATE TABLE IF NOT EXISTS product (
    pid INT, 
    name VARCHAR(255) UNIQUE, 
    price DECIMAL(5,2), 
    PRIMARY KEY (pid)
);

INSERT IGNORE INTO product VALUES (1, "Milk", 10), (2, "Curd", 10), (3, "Special Curd", 10);

CREATE TABLE IF NOT EXISTS `order` (
    oid INT AUTO_INCREMENT, 
    rid INT, 
    date DATE, 
    PRIMARY KEY (oid),
    FOREIGN KEY (rid) REFERENCES retailer (rid)
);
