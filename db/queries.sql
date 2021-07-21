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
    FOREIGN KEY (region) REFERENCES region (name) ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS retailer (
    rid INT AUTO_INCREMENT, 
    name VARCHAR(255), 
    phone CHAR(10) UNIQUE, 
    region VARCHAR(255), 
    password VARCHAR(255), 
    PRIMARY KEY (rid), 
    FOREIGN KEY (region) REFERENCES distributor (region) ON DELETE SET NULL
);

INSERT IGNORE INTO region (name) VALUES ("Palayam"), ("Pattom"), ("Kazhakkoottam"), ("Sreekaryam");

CREATE TABLE IF NOT EXISTS product (
    pid INT, 
    name VARCHAR(255) UNIQUE, 
    price DECIMAL(5,2), 
    PRIMARY KEY (pid)
);

INSERT IGNORE INTO product VALUES (1, "Milk", 24), (2, "Curd", 27), (3, "Special Curd", 35);

CREATE TABLE IF NOT EXISTS `order` (
    oid INT AUTO_INCREMENT, 
    rid INT, 
    date DATE,
    isPlaced TINYINT DEFAULT 1,
    amount DECIMAL(5,2), 
    isDelivered TINYINT,
    PRIMARY KEY (oid),
    FOREIGN KEY (rid) REFERENCES retailer (rid) ON DELETE CASCADE,
    UNIQUE (rid, date)
);

CREATE TABLE IF NOT EXISTS order_product (
    oid INT, 
    pid INT,
    `count` INT,
    FOREIGN KEY (oid) REFERENCES `order` (oid) ON DELETE CASCADE,
    FOREIGN KEY (pid) REFERENCES product (pid) ON DELETE NO ACTION
);
