DROP DATABASE mydb;
CREATE SCHEMA IF NOT EXISTS mydb;
USE mydb;

CREATE TABLE IF NOT EXISTS `mydb`.`book` (
  `idbook` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `pubyear` YEAR NULL,
  PRIMARY KEY (`idbook`))
ENGINE = InnoDB;

INSERT INTO book VALUES
(NULL, 'Книга 1', 1001, 2021),
(NULL, 'Книга 2', 1002, 2022),
(NULL, 'Книга 3', 1003, 2023),
(NULL, 'Книга 4', 1004, 2024);

UPDATE book SET price = price + 500;
DELETE FROM book WHERE idbook=1;
SELECT * FROM book;

UPDATE book SET price = price - 500
where idbook=3;