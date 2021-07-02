CREATE DATABASE dairydash;
USE dairydash;

CREATE TABLE region (
    name VARCHAR(255), 
    PRIMARY KEY (name)
);
CREATE TABLE distributor (
    did INT AUTO_INCREMENT, 
    name VARCHAR(255), 
    phone CHAR(10) UNIQUE, 
    region VARCHAR(255) UNIQUE, 
    password VARCHAR(255), 
    PRIMARY KEY (did), 
    FOREIGN KEY (region) REFERENCES region (name)
);
CREATE TABLE retailer (
    rid INT AUTO_INCREMENT, 
    name VARCHAR(255), 
    phone CHAR(10) UNIQUE, 
    region VARCHAR(255), 
    password VARCHAR(255), 
    PRIMARY KEY (rid), 
    FOREIGN KEY (region) REFERENCES distributor (region)
);

ALTER TABLE distributor ADD CONSTRAINT FOREIGN KEY (region) REFERENCES region(name);

INSERT INTO region (name) VALUES ("Palayam"), ("Pattom"), ("Kazhakkoottam"), ("Sreekaryam");